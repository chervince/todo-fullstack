Cloner le projet (première utilisation sur une nouvelle machine)
bash
Copier
Modifier
git clone git@github.com:chervince/todo-fullstack.git
cd todo-fullstack
docker compose up --build

Enregistrer et synchroniser des changements
bash
Copier
Modifier
git status               # Vérifier les fichiers modifiés
git add .                # Ajouter tous les changements
git commit -m "Message clair sur la modification"
git push                 # Envoyer les changements sur GitHub
