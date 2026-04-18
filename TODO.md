TODO

Deployment
- [ ] create CNAME records for yy.dep.la, yy-api.dep.la, yy-db.dep.la
- [ ] spin up Render services - configure domains etc. - have it up and running

Development
- [ ] add list of supported languages (36)
    - [ ] new "Locale" Model (id:string, code:string (ISO format)) in schema.prisma
    - [ ] in seed.ts - insert 36 languages with codes
    - [ ] add Locale relation to User, one-to-one
- [ ] add MessageTranslation model (id, message:relation, locale:relation, translation: String  @db.Text) in schema.prisma
    - [ ] in createDraft in app controller, after saving message, send request to 