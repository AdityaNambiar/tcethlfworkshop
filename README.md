# TCET Workshop Documentation on Hyperledger Fabric 
## Getting Started
- Create a folder to keep all of your fabric components together under one folder. We further refer to this folder as our 'project folder'.
### Installing Hyperledger Composer and its developement tools
- Refer [the official documentation page](https://hyperledger.github.io/composer/latest/installing/installing-prereqs.html) to know which prerequisites are being installed in the script below. The only issue with the script they provide is that its outdated and therefore we updated the script to make sure it does it correctly.  
1. Prerequisites
- Download the prerequisites script added in this repository. [Click here](https://raw.githubusercontent.com/AdityaNambiar/tcethlfworkshop/master/prereqs-ubuntu-updated.sh) and press CTRL+S to save the bash script (as .sh file) in your project folder. 
- Give the execute permission if needed and execute the script:
```
$ chmod +x prereqs-ubuntu-updated.sh
$ ./prereqs-ubuntu-updated.sh
```
  - The following should be seen on your terminal, marking successful completion of the script. Each tool **must** show its version as intended and nothing that says 'command not found' or similar.
  ![Terminal Output](screenshots/termoutput.png)

2. Developement tools and bash scripts
- Here we will be adding the composer tool and a folder that gives us few automated script to run composer's blockchain network. 
- [Click here](https://hyperledger.github.io/composer/latest/installing/development-tools.html) to open the website which we are going to refer to.
  - Download each one of them as listed under Step 1 till Step 4.
  - Execute startFabric.sh file by doing:  
  	`./startFabric.sh`	=> This will start the hyperledger fabric.
  - Now create the PeerAdmin Card:
    - Execute the createPeerAdminCard.sh file  by doing:  
      `createPeerAdminCard.sh`
      => This will create a card name as PeerAdmin@hlfv1
  - Deploying Business-Network-file (BNA or .bna) to the fabric:
    - Create the archive of your project:
      Go to the project folder directory where package.json file resides.
      Execute the following command:  
      `composer archive create -t dir -n ./`
      => The .bna file will be created. For example, BNA file name is projectname@0.0.1.bna
    - Install that bna(business-network-application) to the fabric:  
      `composer network install -a project@0.0.1.bna -c PeerAdmin@hlfv1`
    - Start the network:  
      `composer network start -c PeerAdmin@hlfv1 -n projectname -V 0.0.1 -A admin -S adminpassword`
      **Note**: Make sure your internet connection is on.
    - Importing the Admin Card to the fabric:  
      `composer card import -f admin@projectname.card -c admin@projectname.`
    - Ping the network to check everything is correct:
      `composer network ping -c admin@projectname`
  - Stopping the network:
    - Execute the file stopFabric.sh
      Command: `./stopFabric.sh`
    - Remove all the cards generated:   
      	a. Go to the /home/<your_username>/.composer/cards directory and delete all cards.
        b. Delete all __.card__ files (exported / downloaded files).
      **NOTE**: Incase you cant find .composer folder in your home directory , enable show hidden files option in ubuntu system.
  - Incase you are facing errors and want to flush the network:  
    - Find the `teardownFabric.sh` script in fabric-dev-servers folder (or any renamed folder where you downloaded your 	developement tools) and execute it.
    - If you don’t find the script perform the below operations: 
      Command: `docker rm $(docker ps -aq)`






  
    
