# Principe

On découpe le fichier json avec la fonction **createReadStream**.  
On recherche dans chaque bloc l'**indexof** correspondant à l'id.  
Ensuite on rechercher la première accolade ouvrante ainsi que la première accolade fermante.  
On convertit en json le texte compris entre l'accolade ouvrante et l'accolade fermante. Puis on recherche la propriété name.

## Problèmes

- Si le découpage est fait de manière à ce que l'id et le name ne se retrouve pas dans le même découpage
  => le texte ne peut pas être converti en json
  ~> Changer le buffer du parse

- Si la première accolade fermante ferme une autre propriété
  => le texte ne peut pas être convertit en json  
  ~> test try catch

++ C'est fonctionnel.

+ Ajout d'une condition si l'id donné n'est pas un nombre (il faudrait qu'elle fasse une boucle car elle ne le vérifie que lors de la première saisie, si jamais je donne deux caractère  d'affilée, cela termine le script).
+ 
Points négatifs :
	
-- De nombreuses choses ne devant pas être versionées le sont (les deux projets alors que seul le bigparsing a été réalisé, .vscode qui est le dossier de l'IDE, 3 README au lieu d'un seul).
	
- Il faut faire gaffe à la déclaration de variables (let), certaines peuvent être déclarées en constantes (const)?
	
- Attention aux commentaires, ils doivent être en anglais, et certains commentaires ne contiennent aucun texte.
