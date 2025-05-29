# Google Photos
Macros and tools to reduce memory space usage by Google Photos.

Google makes this painfully difficult to administer manually, so I'm automating some of these steps.
- Identify media with large file sizes
- Identify media that in an album (and likely can be deleted as unwanted)

## Authentication

Auth token generated via Gcloud iam-admin endpoint:
https://console.cloud.google.com/iam-admin/serviceaccounts/details/111383979923620733380/keys?authuser=1&inv=1&invt=AbxKDw&project=spherical-treat-459602-q3

OAuth service client admin page:
https://console.cloud.google.com/auth/clients/613132851529-dsu1tob925fqde93clge6n07bu67uuqn.apps.googleusercontent.com?authuser=1&inv=1&invt=AbxKMQ&project=spherical-treat-459602-q3

### via GCloud CLI

```bash
# see current login info
gcloud auth list

# authenticate with minimal configuraiton
gcloud auth login --brief

# set active account
gcloud config set account `ACCOUNT`

# log out of a given account
gcloud auth revoke test@gmail.com
```

```bash

# Copy auth token to env variable
ACCESS_TOKEN=$(gcloud auth print-access-token)
google-photos % echo $ACCESS_TOKEN

```
### TODO: try recreating this sample

https://github.com/googlesamples/google-photos/tree/main
https://github.com/googlesamples/google-photos/blob/main/REST/PhotoFrame/app.js
- doesn't work... Google removed permissions for interacting with photos not created by the app itself.
- https://developers.google.com/photos/overview/authorization
- Need to use the picker API instead...


Alternative version that had a non-OAuth crredential (proably meaningless since library API is dead)
- https://github.com/mattd/google-photos-downloader
