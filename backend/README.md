# Fitness Site

## Overview

Fitness Site is a web application built using Django for the backend and React for the frontend. This README provides instructions on how to set up and run the development environment for both parts of the project.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- Python (3.8 or higher)
- Node.js (14.x or higher) and npm
- Git

### Setting Up the Backend (Django)

#### Create and Activate a Virtual Environment

```bash
python -m venv venv
source venv/bin/activate
# On Windows, use `venv\Scripts\activate`
```

#### Install Backend Dependencies

With the virtual environment activated, install the required dependencies:

```bash
pip install -r requirements.txt
```

#### Configure Environment Variables

Copy the `.env.development` file in the root directory of the project and rename it to `.env` and add the necessary environment variables:

```env
REACT_APP_FIREBASE_API_KEY=VAL
REACT_APP_FIREBASE_AUTH_DOMAIN=VAL
REACT_APP_FIREBASE_PROJECT_ID=VAL
REACT_APP_FIREBASE_STORAGE_BUCKET=VAL
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=VAL
REACT_APP_FIREBASE_APP_ID=VAL
REACT_APP_FIREBASE_MEASUREMENT_ID=VAL
REACT_APP_STRIPE_SECRET_KEY=VAL
REACT_APP_STRIPE_PUBLIC_KEY=VAL
SECRET_KEY=VAL
STRIPE_SECRET_KEY=VAL
STRIPE_PUBLISHABLE_KEY=VAL
```

#### Apply Migrations and Create a Superuser

Create the base databsae:

```bash
python manage.py migrate --run-syncdb
```

Apply the database migrations:

```bash
python manage.py migrate
```

Create a superuser for accessing the Django admin interface:

```bash
python manage.py createsuperuser
```

#### Run the Backend Server

Start the Django development server:

```bash
python manage.py runserver
```

The backend server should now be running at `http://127.0.0.1:8000/`.

### Setting Up the Frontend (React)

#### Install Frontend Dependencies

```bash
npm install
```

#### Configure Environment Variables

Copy the `.env.development` file in the root directory of the project and rename it to `.env` and add the necessary environment variables:

```env
REACT_APP_FIREBASE_API_KEY=VAL
REACT_APP_FIREBASE_AUTH_DOMAIN=VAL
REACT_APP_FIREBASE_PROJECT_ID=VAL
REACT_APP_FIREBASE_STORAGE_BUCKET=VAL
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=VAL
REACT_APP_FIREBASE_APP_ID=VAL
REACT_APP_FIREBASE_MEASUREMENT_ID=VAL
REACT_APP_STRIPE_SECRET_KEY=VAL
REACT_APP_STRIPE_PUBLIC_KEY=VAL
SECRET_KEY=VAL
STRIPE_SECRET_KEY=VAL
STRIPE_PUBLISHABLE_KEY=VAL
```

#### Run the Frontend Server

Start the React development server:

```bash
npm run dev
```

The frontend server should now be running at `http://localhost:3000/`.
