export const heartAnims=(anims)=>{
    anims.create({
        key:"full_health",
        frames:anims.generateFrameNames("heart",{frames:[4]}),
        frameRate:10
    })

      anims.create({
        key:"1/4_health",
        frames:anims.generateFrameNames("heart",{frames:[3]})
    })

      anims.create({
        key:"half_health",
        frames:anims.generateFrameNames("heart",{frames:[2]})
    })
    anims.create({
        key:"3/4_health",
        frames:anims.generateFrameNames("heart",{frames:[1]})
    })
     anims.create({
        key:"0_health",
        frames:anims.generateFrameNames("heart",{frames:[0]})
    })
    
}