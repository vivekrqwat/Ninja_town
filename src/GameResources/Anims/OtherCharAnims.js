export const OtherCharAnims=(anims,key,aniname)=>{

     anims.create({
                key:`${key}-idle-front`,
                frames:anims.generateFrameNames(`${aniname}`,{frames:[0]}),
                 frameRate:10,
                   repeat:-1
                })

       anims.create({
                key:`${key}-idle-up`,
                frames:anims.generateFrameNames(`${aniname}`,{frames:[1]}),
                 frameRate:10,
                   repeat:-1
                })
        
       anims.create({
                key:`${key}-idle-left`,
                frames:anims.generateFrameNames(`${aniname}`,{frames:[2]}),
                 frameRate:10,
                   repeat:-1
                })

             
       anims.create({
                key:`${key}-idle-right`,
                frames:anims.generateFrameNames(`${aniname}`,{frames:[3]}),
                 frameRate:10,
                   repeat:-1
                })

  anims.create({
                key:`${key}-walk-front`,
                frames:anims.generateFrameNames(`${aniname}`,{frames:[0,4,8]}),
                 frameRate:10,
                   repeat:-1
                })

                 anims.create({
                key:`${key}-walk-up`,
                frames:anims.generateFrameNames(`${aniname}`,{frames:[1,5,9]}),
                 frameRate:10,
                   repeat:-1
                })

                
                 anims.create({
                key:`${key}-walk-left`,
                frames:anims.generateFrameNames(`${aniname}`,{frames:[2,6,10]}),
                 frameRate:10,
                   repeat:-1
                })

                 anims.create({
                key:`${key}-walk-right`,
                frames:anims.generateFrameNames(`${aniname}`,{frames:[3,7,11]}),
                 frameRate:10,
                   repeat:-1
                })

                 anims.create({
                key:`${key}-fight-left`,
                frames:anims.generateFrameNames(`${aniname}`,{frames:[14,18,22]}),
                 frameRate:10,
                   repeat:3
                })

                 anims.create({
                key:`${key}-fight-right`,
                frames:anims.generateFrameNames(`${aniname}`,{frames:[15,19,23]}),
                 frameRate:10,
                   repeat:3
                })

                 anims.create({
                key:`${key}-spell`,
                frames:anims.generateFrameNames(`${aniname}`,{frames:[27]}),
                 frameRate:10,
                   repeat:1,
                   
                })
                 anims.create({
                key:`${key}`,
                frames:anims.generateFrameNames(`${aniname}`,{frames:[0,1,2,3,4,5,7,8]}),
                 frameRate:15,
                
                   hideOnComplete:true
                   
                })



}