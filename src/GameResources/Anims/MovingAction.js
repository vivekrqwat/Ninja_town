export const MovingAnims=(anims)=>{

//gladiator

   anims.create({
                key:"gladiator-idle-front",
                frames:anims.generateFrameNames("gladiator",{frames:[0]}),
                 frameRate:10,
                   repeat:-1
                })

       anims.create({
                key:"gladiator-idle-up",
                frames:anims.generateFrameNames("gladiator",{frames:[1]}),
                 frameRate:10,
                   repeat:-1
                })
        
       anims.create({
                key:"gladiator-idle-left",
                frames:anims.generateFrameNames("gladiator",{frames:[2]}),
                 frameRate:10,
                   repeat:-1
                })

             
       anims.create({
                key:"gladiator-idle-right",
                frames:anims.generateFrameNames("gladiator",{frames:[3]}),
                 frameRate:10,
                   repeat:-1
                })

  anims.create({
                key:"gladiator-walk-front",
                frames:anims.generateFrameNames("gladiator",{frames:[0,4,8]}),
                 frameRate:10,
                   repeat:-1
                })

                 anims.create({
                key:"gladiator-walk-up",
                frames:anims.generateFrameNames("gladiator",{frames:[1,5,9]}),
                 frameRate:10,
                   repeat:-1
                })

                
                 anims.create({
                key:"gladiator-walk-left",
                frames:anims.generateFrameNames("gladiator",{frames:[2,6,10]}),
                 frameRate:10,
                   repeat:-1
                })

                 anims.create({
                key:"gladiator-walk-right",
                frames:anims.generateFrameNames("gladiator",{frames:[3,7,11]}),
                 frameRate:10,
                   repeat:-1
                })




//ninja
       anims.create({
                key:"ninja-walk-front",
                frames:anims.generateFrameNames("ninja",{frames:[0,8,16,24,32,40]}),
                frameRate:10,
             
              })

              anims.create({
                key:"ninja-walk-up",
                frames:anims.generateFrameNames("ninja",{frames:[1,9,17,25,33,41]}),
                frameRate:10,
            
              })
               anims.create({
                key:"ninja-walk-left",
                frames:anims.generateFrameNames("ninja",{frames:[2,10,18,26,34]}),
                frameRate:8,
               
              })

               anims.create({
                key:"ninja-walk-right",
                frames:anims.generateFrameNames("ninja",{frames:[3,11,19,27,35]}),
                frameRate:8,
               
              })



                anims.create({
                key:"ninja-roll-front",
                frames:anims.generateFrameNames("ninja",{frames:[52,60,68,72]}),
                frameRate:8,
                repeat:-1
              })
              anims.create({
                key:"ninja-roll-sideleft",
                frames:anims.generateFrameNames("ninja",{frames:[54,63,70,74]}),
                frameRate:8,
                repeat:-1
              })
               anims.create({
                key:"ninja-roll-sideright",
                frames:anims.generateFrameNames("ninja",{frames:[55,64,71,75]}),
                frameRate:8,
                repeat:-1
              })
              anims.create({
                key:"ninja-swin-front",
                frames:anims.generateFrameNames("ninja",{frames:[64,72,80,88]}),
                frameRate:8,
                repeat:-1
              })
               anims.create({
                key:"ninja-swin-up",
                frames:anims.generateFrameNames("ninja",{frames:[65,73,81,89]}),
                frameRate:8,
                repeat:-1
              })
                anims.create({
                key:"ninja-swin-left",
                frames:anims.generateFrameNames("ninja",{frames:[66,74]}),
                frameRate:4,
                repeat:-1
              })
               anims.create({
                key:"ninja-sl-front",
                frames:anims.generateFrameNames("ninja",{frames:[96,104,112]}),
                frameRate:4,
                repeat:-1
              })

              anims.create({
                key:"ninja-sl-up",
                frames:anims.generateFrameNames("ninja",{frames:[97,105,113]}),
                frameRate:4,
                repeat:-1
              })
              
              anims.create({
                key:"attacko1",
                frames:anims.generateFrameNames("rockattack",{frames:[6,0,1,2,3,4,5]}),
                frameRate:16,
                repeat:0,
                 hideOnComplete: true
      
              })

              anims.create({
                key:"attacko2",
             frames:anims.generateFrameNames("ninjawater",{frames:[5,4,3,2,1,0]}),
               frameRate:16,
                repeat:0,
                 hideOnComplete: true
              })
               anims.create({
                key:"attacko3",
             frames:anims.generateFrameNames("ninjwaterpillar",{frames:[0,1,2,3,4,5]}),
               frameRate:13,
                repeat:0,
                 hideOnComplete: true
              })
              anims.create({
                key:"attacko4",
             frames:anims.generateFrameNames("explosion",{frames:[0,1,2,3,4,5,6,7]}),
               frameRate:13,
                repeat:0,
                 hideOnComplete: true
              })

              anims.create({
                key:"ninja-idle",
                frames:anims.generateFrameNames("ninja",{frames:[0]}),

              })
              anims.create({
                key:"ninja-spell",
                frames:anims.generateFrameNames("ninja",{frames:[110,118]}),
                  

              })
              anims.create({
                key:"s01",
                frames:anims.generateFrameNames("slash",{frames:[0,1,2,3,4,5,6,7]}),
                frameRate:12,
                 repeat:0,
                 hideOnComplete: true

              })

              anims.create({
                key:"katana-front",
                frames:anims.generateFrameNames("katana",{frames:[0,4,8,12]}),
                frameRate:13,
              
                 hideOnComplete: true

              })
               anims.create({
                key:"katana-up",
                frames:anims.generateFrameNames("katana",{frames:[1,5,9,13]}),
                frameRate:13,
              
                 hideOnComplete: true

              })
               anims.create({
                key:"katana-left",
                frames:anims.generateFrameNames("katana",{frames:[2,6,10,14]}),
                frameRate:13,
              
                 hideOnComplete: true

              })

                  anims.create({
                key:"katana-right",
                frames:anims.generateFrameNames("katana",{frames:[3,7,11,15]}),
                frameRate:13,
              
                 hideOnComplete: true

              })

              

              anims.create({
                key:"ninja-katna-front",
                frames:anims.generateFrameNames("ninja",{frames:[4,12,20,28]}),
                 frameRate:10,

              })
              
              anims.create({
                key:"ninja-katna-up",
                frames:anims.generateFrameNames("ninja",{frames:[5,13,21,29]}),
                 frameRate:10,

              })
              anims.create({
                key:"ninja-katna-left",
                frames:anims.generateFrameNames("ninja",{frames:[6,14,22,30]}),
                 frameRate:22,

              })
                      anims.create({
                key:"ninja-katna-right",
                frames:anims.generateFrameNames("ninja",{frames:[6,14]}),
                 frameRate:10,

              })

              
              
    
}