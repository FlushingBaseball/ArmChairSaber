PGPASSWORD=BRMlCGVKU1vFMz0Ak7LAJZLlQOYUODx5 pg_dump \
  -h postgres.render.com \
  -U armchairdb_user \
  --format=custom --no-acl --no-owner \
 armchairdb > try1.dump