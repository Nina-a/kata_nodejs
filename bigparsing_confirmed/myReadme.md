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
