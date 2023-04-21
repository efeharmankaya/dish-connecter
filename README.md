# Dish Connecter
`Final group project part of User Interface Design (SOEN 357)`

[Demo](https://dish-connecter-384415.uc.r.appspot.com)

[INSERT DESCRIPTION]

| Team Members |  Id |
| -- | -- |
| Daniel Soldera |  40168674 |
| Luca Dallaire   |  40132255 |
| Maham Rida   |  40089547 |
| Randhall-Mitchell Charles   |  40085890 |
| Dikran Missirian   |  40157505 |
| Efe Harmankaya   |  40077277 |

## Install

### Frontend

Navigate to `/dish-connecter/app`
```
> npm install
```
### Backend

Navigate to `/dish-connecter/api`
```
> pip install -r requirements.txt
```

## Usage

### Frontend
Navigate to `/dish-connecter/app`
```
> npm run start
```

### Backend
Navigate to `/dish-connecter/api`
```
> python3 api.py
```

## Deploy
`Note: ensure your are in the correct branch dish-connecter/prod`
As the proxy must be changed from development localhost to `"proxy": "https://dish-connecter-api.uc.r.appspot.com"`

### Frontend

Navigate to `/dish-connecter/app`
```
> gcloud app deploy --project=dish-connecter-384415
```

### Backend

Navigate to `/dish-connecter/api`
```
> gcloud app deploy --project=dish-connecter-api
```

