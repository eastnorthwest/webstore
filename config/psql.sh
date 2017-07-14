#!/usr/bin/env bash
psql $DATABASE_URL < ./config/schema.sql $DATABASE_NAME
psql $DATABASE_URL < ./config/states.sql $DATABASE_NAME
psql $DATABASE_URL < ./config/countries.sql $DATABASE_NAME
