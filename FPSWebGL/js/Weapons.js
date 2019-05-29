Weapons = function (Player) {
    // On permet d'accéder à Player n'importe où dans Weapons
    this.player = Player;

    // Import de l'armurerie depuis Game
    this.armory = Player.game.armory;

    // Position selon l'arme non utilisée
    this.bottomPosition = new BABYLON.Vector3(0.75, -2.5, 1.5);

    // Changement de Y quand l'arme est sélectionnée
    this.topPositionY = -0.5;

    // Ajout de l'inventaire
    this.inventory = [];

    // Créons notre lance-roquettes
    var ezekiel = this.newWeapon('Ezekiel')
    this.inventory[0] = ezekiel;

    // Notre arme actuelle est Ezekiel, qui se trouve en deuxième position
    // dans le tableau des armes dans Armory
    this.actualWeapon = this.inventory.length -1;

    // On dit que notre arme en main est l'arme active
    this.inventory[this.actualWeapon].isActive = true;

    // On dit que la cadence est celle de l'arme actuelle (grâce à typeWeapon)
    this.fireRate = this.armory.weapons[this.inventory[this.actualWeapon].typeWeapon].setup.cadency;

    this._deltaFireRate = this.fireRate;

    this.canFire = true;

    this.launchBullets = false;

    var _this = this;


    //Engine va nous être utile pour la cadence de tir
    var engine = Player.game.scene.getEngine();

    Player.game.scene.registerBeforeRender(function() {
        if (!_this.canFire) {
            _this._deltaFireRate -= engine.getDeltaTime();
            if (_this._deltaFireRate <= 0  && _this.player.isAlive) {
                _this.canFire = true;
                _this._deltaFireRate = _this.fireRate;
            }
        }
    });
};

Weapons.prototype = {
    newWeapon : function(typeWeapon) {
        var newWeapon;
        for (var i = 0; i < this.armory.weapons.length; i++) {
            if(this.armory.weapons[i].name === typeWeapon){

                newWeapon = BABYLON.Mesh.CreateBox('rocketLauncher', 0.5, this.player.game.scene);

                // Nous faisons en sorte d'avoir une arme d'apparence plus longue que large
                newWeapon.scaling = new BABYLON.Vector3(1,0.7,2);

                // On l'associe à la caméra pour qu'il bouge de la même facon
                newWeapon.parent = this.player.camera;

                // On positionne le mesh APRES l'avoir attaché à la caméra
                newWeapon.position = this.bottomPosition.clone();

                newWeapon.isPickable = false;

                // Ajoutons un material de l'arme pour le rendre plus visible
                var materialWeapon = new BABYLON.StandardMaterial('rocketLauncherMat', this.player.game.scene);
                materialWeapon.diffuseColor = this.armory.weapons[i].setup.colorMesh;

                newWeapon.material = materialWeapon;

                newWeapon.typeWeapon = i;

                newWeapon.isActive = false;
                break;
            }else if(i === this.armory.weapons.length -1){
                console.log('UNKNOWN WEAPON');
            }
        }

        return newWeapon
    },

    fire : function(pickInfo) {
        this.launchBullets = true;
    },

    stopFire : function(pickInfo) {
        this.launchBullets = false;
    },

    launchFire : function() {
        if (this.canFire) {
            var idWeapon = this.inventory[this.actualWeapon].typeWeapon;
            var weaponAmmos = this.inventory[this.actualWeapon].ammos;
            var renderWidth = this.player.game.engine.getRenderWidth(true);
            var renderHeight = this.player.game.engine.getRenderHeight(true);
            var direction = this.player.game.scene.pick(renderWidth/2,renderHeight/2,function (item) {
            if (item.name === "playerBox" || item.name === "weapon" || item.id === "hitBoxPlayer")
                return false;
            else
                return true;
            });
            // Si l'arme est une arme de distance
            if(this.armory.weapons[idWeapon].type === 'ranged'){
                if(this.armory.weapons[idWeapon].setup.ammos.type === 'rocket'){
                    // Nous devons tirer une roquette
                    direction = direction.pickedPoint.subtractInPlace(this.player.camera.playerBox.position);
                    direction = direction.normalize();
                    this.createRocket(this.player.camera.playerBox,direction)
                }else if(this.armory.weapons[idWeapon].setup.ammos.type === 'bullet'){
                    // Nous devons tirer des balles simples
                }else{
                    // Nous devons tirer au laser
                }
            }else{
                // Si ce n'est pas une arme à distance, il faut attaquer au corps-à-corps
            }
            this.canFire = false;
        }
    },

    createRocket : function(playerPosition, direction) {
        // Permet de connaitre l'id de l'arme dans Armory.js
        var idWeapon = this.inventory[this.actualWeapon].typeWeapon;

        // Les paramètres de l'arme
        var setupRocket = this.armory.weapons[idWeapon].setup.ammos;

        var positionValue = this.actualWeapon.absolutePosition.clone();
        var rotationValue = playerPosition.rotation;
        var newRocket = BABYLON.Mesh.CreateBox("rocket", 1, this.player.game.scene);
        newRocket.direction = direction;
        newRocket.position = new BABYLON.Vector3(
            positionValue.x + (newRocket.direction.x * 1) ,
            positionValue.y + (newRocket.direction.y * 1) ,
            positionValue.z + (newRocket.direction.z * 1));
        newRocket.rotation = new BABYLON.Vector3(rotationValue.x,rotationValue.y,rotationValue.z);
        newRocket.scaling = new BABYLON.Vector3(0.5,0.5,1);
        newRocket.isPickable = false;

        newRocket.material = new BABYLON.StandardMaterial("textureWeapon", this.player.game.scene);
        newRocket.material.diffuseColor = this.armory.weapons[idWeapon].setup.colorMesh;
        newRocket.paramsRocket = this.armory.weapons[idWeapon].setup;

        // On donne accès à Player dans registerBeforeRender
        var Player = this.player;

        this.player.game._rockets.push(newRocket);
    }
};
