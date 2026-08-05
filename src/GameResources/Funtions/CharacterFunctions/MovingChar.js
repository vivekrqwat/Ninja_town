  export const NInjaMovement=(player,cursor,secne,keyZ)=>{

          if(!player||!cursor){return;}
        let ismoving=false;

            if(keyZ.isDown&&(cursor.left.isDown||cursor.right.isDown)){
               
                 ismoving=true
                if(cursor.left.isDown){
                ismoving=true
                // alert("l")
                //    player.setVelocityX(-100)
                player.anims.play("ninja-roll-sideleft",true)
                }else {
                     ismoving=true
                   player.setVelocityX(100)
                player.anims.play("ninja-roll-sideright",true)

                }
             
            }

       else if(cursor.down.isDown){
            player.setVelocityY(100)
          
            player.anims.play("ninja-walk-front",true)
            ismoving=true;
        }
        else if(cursor.up.isDown){
            player.setVelocityY(-100)
        
            
    player.anims.play("ninja-walk-up",true)
             ismoving=true;
        }
         
      if (cursor.right.isDown&&keyZ.isDown==false) {
        ismoving=true;
    player.setVelocityX(100);
 
   player.flipX=true;
    player.anims.play("ninja-walk-right", true);
}
else if (cursor.left.isDown&&keyZ.isDown==false) {
    ismoving=true;
 
    player.setVelocityX(-100);
   player.flipX=false;
  
    player.anims.play("ninja-walk-right", true);
}

        
        if(!ismoving){
           
            player.setVelocityX(0)
            player.setVelocityY(0)
           player.anims.play("ninja-idle",true)
        }

    }