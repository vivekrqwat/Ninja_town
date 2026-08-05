import { Scene } from "phaser";
import ninja from "../Resources/ninja/ninja.png";
import slash from "../Resources/ninja/slash.png";
import rockAttack from "../Resources/ninja/rockattack.png";
import explosion from "../Resources/ninja/explosion.png";
import kunia from "../Resources/ninja/kunia.png"
import shuriken from "../Resources/ninja/Shuriken.png"
import katana from "../Resources/ninja/Katana.png"
import Coin from "../Resources/collect/Coin2.png"
import gladiator from "../Resources/$char/galdiator.png"
// import inspector from "../Resources/$char/inspector.png"
// import iceman from "../Resources/$char/iceman.png"
// import lion from "../Resources/$char/lion.png"
// import women from "../Resources/$char/women.png"
// import oldman from "../Resources/$char/oldman.png"
// import demon from "../Resources/$char/demon.png"
// import Egggril from "../Resources/$char/Egggril.png"
import boost from "../Resources/$char/boost.png"
import newtown from "../Maps/newTown.json"
import tileset from "../Maps/tileset/TilesetField.png"
import Desert from "../Maps/tileset/Desert.png"
import house from "../Maps/tileset/house.png"
import Element from "../Maps/tileset/Element.png"
import tilefloor from "../Maps/tileset/tilefloor.png"
import TilesetFloor from "../Maps/tileset/TilesetFloor.png"
import nature from "../Maps/tileset/TilesetNature.png"
import bamboo from "../Resources/villans/bamboo.png"
import Beast from "../Resources/villans/Beast.png"
import flam from "../Resources/villans/flam.png"
import oldlady from "../Resources/$char/oldlady.png"
import grass from "../Resources/Objects/Grass.png"
import kunai01 from "../Resources/Objects/Kunai.png"
import Scroll from "../Resources/Objects/Scroll.png"
import leaf from "../Resources/Objects/TeaLeaf.png"
import ninjaG from "../Resources/$char/ninjaG.png"
import Heart from "../Resources/ninja/Heart.png"
import Redninja from "../Resources/$char/red_ninja.png"
import Key from "../Resources/Objects/KeyLeft.png"
import X from "../Resources/Objects/X.png"
import Y from "../Resources/Objects/Y.png"
import space from "../Resources/Objects/space.png"











export class Prelaod extends Scene {
    constructor() {
        super("Preload");
    }

    preload() {
        let OtherCHaracter=[
            {name:"gladiator",path:gladiator},
            // {name:"inspector",path:inspector},
            // {name:"iceman",path:iceman},
            // {name:"lion",path:lion},
            // {name:"women",path:women},
            // {name:"oldman",path:oldman},
            // {name:"demon",path:demon},
            // {name:"Egggril",path:Egggril},
            {name:"bamboo",path:bamboo},
             {name:"Beast",path:Beast},
             {name:"flam",path:flam},
             {name:"oldlady",path:oldlady},
             {name:"ninjaG",path:ninjaG},
             {name:"heart",path:Heart},
             {name:"red_ninja",path:Redninja},
             {name:"Key",path:Key},
             {name:"X",path:X},
             {name:"Y",path:Y},
             {name:"space",path:space}
          


          
        ]
        let Objects=[  
               {name:"grass",path:grass},
             {name:"kunaio1",path:kunai01},
             {name:"Scroll",path:Scroll},
             {name:"leaf",path:leaf}
            ]
           Objects.forEach((i)=>{
            this.load.image(i.name,i.path)
           })

        this.load.spritesheet("boost", boost, {
            frameHeight: 32,
            frameWidth: 42,
        });

        this.load.spritesheet("ninja", ninja, {
            frameHeight: 32,
            frameWidth: 32,
        });

         this.load.spritesheet("kunia", kunia, {
            frameHeight: 10,
            frameWidth: 6,
        });
        this.load.spritesheet("katana", katana, {
            frameHeight: 64,
            frameWidth: 64,
        });

        OtherCHaracter.forEach((item)=>{
            this.load.spritesheet(item.name, item.path, {
            frameHeight: 16,
            frameWidth: 16,
        });

        })
          
        
        
        
         this.load.spritesheet("shuriken", shuriken, {
            frameHeight: 14,
            frameWidth: 14,
        });


        this.load.spritesheet("slash",slash,{
            frameWidth: 64,
               frameHeight: 50,

        })
         this.load.spritesheet("explosion",explosion,{
                            frameWidth:40,
                            frameHeight:32
                        })

            this.load.spritesheet("rockattack",rockAttack,{
                        frameWidth: 50,
            frameHeight: 44
                })


        //resources..coleection
         this.load.spritesheet("coin",Coin,{
                        frameWidth: 10,
            frameHeight: 10
                })


        //map loading
        this.load.tilemapTiledJSON("ninjatowno1",newtown)
        const tilesetcollection=[{name:"tiles",path:tileset},
            {name:"Desert",path:Desert},
            {name:"house",path:house},
            {name:"tilefloor",path:tilefloor},
             {name:"TilesetFloor",path:TilesetFloor},
             {name:"nature",path:nature},
             {name:"Elements",path:Element}

    ]
    tilesetcollection.forEach((i)=>{
        this.load.image(i.name,i.path)

    })
        

                        
    }

    create() {
        this.scene.start("StartScene");
    }
}