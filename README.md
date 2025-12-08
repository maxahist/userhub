![alt text](image.png)

# Userhub 

Small project to add and find user`s data. 
There are 6 colomns for creating. Search bar is working with all the columns. 
There is a login/password access. 

## Instruction

Install apache2-utils

`
sudo apt install apache2-utils -y
`

Create a login and password (f.e., login: stl)

`sudo htpasswd -c /home/user/userhub/auth.stl stl`

Enter password

Run docker compose 

`docker compose up --build`

## Stack
- python
- react
- postgres
- nginx