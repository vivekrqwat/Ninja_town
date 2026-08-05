import { MovingAnims } from "../Anims/MovingAction"
import { OtherCharAnims } from "../Anims/OtherCharAnims"

export const CharMovingFunc=(dir,secene,speed,name)=>{
    if(name=="ninja")
    MovingAnims(secene.anims)
else{
    OtherCharAnims(secene.anims,name,name)
}
    if(dir=="up"){
        secene.anims.play(name+"-walk-up",true)
        secene.setVelocityY(-speed)
       
    }else if(dir=="down"){
          secene.setVelocityY(speed)
            
             secene.anims.play(name+"-walk-front",true)

    }else if(dir=="left"){
        secene.setVelocityX(-speed)
         secene.anims.play(name+"-walk-left",true)
    }else if(dir=="right"){ 
        secene.setVelocityX(speed)
        secene.anims.play(name+"-walk-right",true)
    }


}