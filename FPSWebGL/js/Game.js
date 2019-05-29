Game = function(canvasId) {
    // Canvas et engine définit ici
    var canvas = document.getElementById(canvasId);
    var engine = new BABYLON.Engine(canvas, true);
    var _this = this;

    _this.actualTime = Date.now();

    this.allSpawnPoints = [
        new BABYLON.Vector3(-20, 5, 0),
        new BABYLON.Vector3(0, 5, 0),
        new BABYLON.Vector3(20, 5, 0),
        new BABYLON.Vector3(-40, 5, 0)
    ];

    // On initie la scène avec une fonction associé à l'objet Game
    this.scene = this._initScene(engine);

    // Ajout de l'armurerie
    var armory = new Armory(this);
    _this.armory = armory;

    //Nouveau joueur
    var _player = new Player(_this,canvas);

    //Nouvelle arène de jeu
    var _arena = new Arena(_this);

    this._PlayerData = _player;

    this.engine = engine;

    // Les roquettes générées dans Player.js
    this._rockets = [];

    // Les explosions qui découlent des roquettes
    this._explosionRadius = [];

    // Permet au jeu de tourner
    engine.runRenderLoop(function () {
        // Récupérer le ratio par les fps
        _this.fps = Math.round(1000/engine.getDeltaTime());

        //Checker le mouvement du joueur en lui envoyant le ration de déplacement
        _player.checkMove((_this.fps)/60);

        _this.scene.render();

        // On apelle nos deux fonctions de calcul pour les roquettes
        _this.renderRockets();
        _this.renderExplosionRadius();

        // Si launchBullets est a true, on tire
        if(_player.camera.weapons.launchBullets === true){
            _player.camera.weapons.launchFire();
        }
    });

    // Ajuste la vue 3D si la fenetre est agrandi ou diminué
    window.addEventListener("resize", function () {
        if (engine) {
            engine.resize();
        }
    },false);
};

Game.prototype = {
    // Prototype d'initialisation de la scène
    _initScene : function(engine) {
        var scene = new BABYLON.Scene(engine);
        scene.clearColor = new BABYLON.Color3(0,0,0);
        scene.gravity = new BABYLON.Vector3(0, -9.81, 0);
        scene.collisionsEnabled = true;
        return scene;
    },
    
    renderRockets : function () {
        for (var i = 0; i < this._rockets.length; i++) {
            // On crée un rayon qui part de la base de la roquette vers l'avant
            var rayRocket = new BABYLON.Ray(this._rockets[i].position,this._rockets[i].direction);

            // On regarde quel est le premier objet qu'on touche
            var meshFound = this._rockets[i].getScene().pickWithRay(rayRocket);

            // Si la distance au premier objet touché est inférieure à 10, on détruit la roquette
            if(!meshFound || meshFound.distance < 10){
                // On vérifie qu'on a bien touché quelque chose
                if(meshFound.pickedMesh && !meshFound.pickedMesh.isMain){
                    // On crée une sphere qui représentera la zone d'impact
                    var explosionRadius = BABYLON.Mesh.CreateSphere("sphere", 5.0, 20, this.scene);
                    // On positionne la sphère là où il y a eu impact
                    explosionRadius.position = meshFound.pickedPoint;
                    // On fait en sorte que les explosions ne soient pas considérées pour le Ray de la roquette
                    explosionRadius.isPickable = false;
                    // On crée un petit material orange
                    explosionRadius.material = new BABYLON.StandardMaterial("textureExplosion", this.scene);
                    explosionRadius.material.diffuseColor = new BABYLON.Color3(1,0.6,0);
                    explosionRadius.material.specularColor = new BABYLON.Color3(0,0,0);
                    explosionRadius.material.alpha = 0.6;

                    // Calcule la matrice de l'objet pour les collisions
                    explosionRadius.computeWorldMatrix(true);

                    if (this._PlayerData.isAlive && this._PlayerData.camera.playerBox && explosionRadius.intersectsMesh(this._PlayerData.camera.playerBox)) {
                        // Envoi à la fonction d'affectation des dégâts
                        this._PlayerData.getDamage(30)
                    }

                    this._explosionRadius.push(explosionRadius);
                }
                this._rockets[i].dispose();
                this._rockets.splice(i,1);
            }else {
                var relativeSpeed = 1 / ((this.fps)/60);
                this._rockets[i].position.addInPlace(this._rockets[i].direction.scale(relativeSpeed))
            }
        }
    },
    
    renderExplosionRadius : function () {
        for (var i = 0; i < this._explosionRadius.length; i++) {
            if(this._explosionRadius.length > 0){
                for (var i = 0; i < this._explosionRadius.length; i++) {
                    this._explosionRadius[i].material.alpha -= 0.02;
                    if(this._explosionRadius[i].material.alpha<=0){
                        this._explosionRadius[i].dispose();
                        this._explosionRadius.splice(i, 1);
                    }
                }
            }
        }
    }
};

document.addEventListener('DOMContentLoaded', function () {
    new Game('renderCanvas');
});

// ------------------------- TRANSFO DE DEGRES/RADIANS
function degToRad(deg)
{
    return (Math.PI*deg)/180
}
// ----------------------------------------------------

// -------------------------- TRANSFO DE DEGRES/RADIANS
function radToDeg(rad)
{
    // return (Math.PI*deg)/180
    return (rad*180)/Math.PI
}
// ----------------------------------------------------
