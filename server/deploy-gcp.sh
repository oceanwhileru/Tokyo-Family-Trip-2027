#!/usr/bin/env bash
# Use an authorized gcloud session. OAuth credentials are supplied outside the source tree.
set -euo pipefail

: "${TRIP_PROJECT:?Set TRIP_PROJECT}"
: "${TRIP_REGION:?Set TRIP_REGION}"
: "${TRIP_SITE_URL:?Set TRIP_SITE_URL}"
: "${GOOGLE_OAUTH_CLIENT_ID:?Set GOOGLE_OAUTH_CLIENT_ID}"
: "${TRIP_BACKEND_URL:?Set TRIP_BACKEND_URL}"
: "${TRIP_SERVICE:=tokyo-family-sync}"
: "${GCLOUD_BIN:=gcloud}"

gcp() { "$GCLOUD_BIN" "$@" --project="$TRIP_PROJECT" --quiet; }
build_id="tokyo-ledger-build"
runtime_id="tokyo-ledger-runtime"
build_account="$build_id@$TRIP_PROJECT.iam.gserviceaccount.com"
runtime_account="$runtime_id@$TRIP_PROJECT.iam.gserviceaccount.com"
oauth_secret="tokyo-ledger-oauth-secret"
session_secret="tokyo-ledger-session-secret"
members_secret="tokyo-ledger-members"

billing="$(gcp billing projects describe "$TRIP_PROJECT" --format='value(billingEnabled)')"
if [[ "$billing" != True ]]; then
  printf '%s\n' 'Cloud Billing must be active before deployment.' >&2
  exit 1
fi

for secret in "$oauth_secret" "$session_secret" "$members_secret"; do
  if ! gcp secrets describe "$secret" --format='value(name)' >/dev/null; then
    printf 'Set up secret %s in Secret Manager first.\n' "$secret" >&2
    exit 1
  fi
done

gcp services enable run.googleapis.com cloudbuild.googleapis.com artifactregistry.googleapis.com iam.googleapis.com
ensure_account() {
  if ! gcp iam service-accounts describe "$2" --format='value(email)' >/dev/null 2>&1; then
    gcp iam service-accounts create "$1" --display-name="$3"
  fi
}

ensure_account "$build_id" "$build_account" 'Tokyo Ledger build'
ensure_account "$runtime_id" "$runtime_account" 'Tokyo Ledger runtime'

gcp projects add-iam-policy-binding "$TRIP_PROJECT" --member="serviceAccount:$build_account" --role=roles/run.builder --condition=None --format=none
gcp projects add-iam-policy-binding "$TRIP_PROJECT" --member="serviceAccount:$runtime_account" --role=roles/datastore.user \
  --condition="expression=resource.name == 'projects/$TRIP_PROJECT/databases/(default)',title=tokyo_ledger_default_database" --format=none

for secret in "$oauth_secret" "$session_secret" "$members_secret"; do
  gcp secrets add-iam-policy-binding "$secret" --member="serviceAccount:$runtime_account" --role=roles/secretmanager.secretAccessor --condition=None --format=none
done

source_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
runtime_env="GOOGLE_CLOUD_PROJECT=$TRIP_PROJECT,TRIP_SITE_URL=$TRIP_SITE_URL,TRIP_BACKEND_URL=$TRIP_BACKEND_URL,GOOGLE_OAUTH_CLIENT_ID=$GOOGLE_OAUTH_CLIENT_ID"
if [[ -n "${TRIP_EXPENSE_SHEET_ID:-}" ]]; then
  : "${TRIP_EXPENSE_TAB_ID:?Set TRIP_EXPENSE_TAB_ID}"
  runtime_env="$runtime_env,TRIP_EXPENSE_SHEET_ID=$TRIP_EXPENSE_SHEET_ID,TRIP_EXPENSE_TAB_ID=$TRIP_EXPENSE_TAB_ID"
fi
gcp run deploy "$TRIP_SERVICE" --region="$TRIP_REGION" --source="$source_dir" \
  --build-service-account="projects/$TRIP_PROJECT/serviceAccounts/$build_account" \
  --service-account="$runtime_account" --no-invoker-iam-check --cpu=1 --memory=512Mi \
  --min-instances=0 --max-instances=1 --concurrency=20 --timeout=35 \
  --set-env-vars="$runtime_env" \
  --set-secrets="GOOGLE_OAUTH_CLIENT_SECRET=$oauth_secret:latest,TRIP_SESSION_SECRET=$session_secret:latest,TRIP_MEMBERS_JSON=$members_secret:latest"
