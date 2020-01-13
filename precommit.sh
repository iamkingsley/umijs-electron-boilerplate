#!/bin/bash
git config --local user.email "bernard.codjoe@ibit-soft.com"
git config --local user.name "Bernard Kingsley Codjoe"
echo "# Use precommit.sh in each git folder to set this" > ~/.ssh/config
echo "IdentityFile ~/.ssh/id_rsa_ibit" >> ~/.ssh/config
