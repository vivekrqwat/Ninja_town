if(dir=="up"){
        this.anims.play(name+"-walk-up",true)
        this.setVelocityY(-speed)
       
    }else if(dir=="down"){
          this.setVelocityY(speed)
            
             this.anims.play(name+"-walk-front",true)

    }else if(dir=="left"){
        this.setVelocityX(-speed)
         this.anims.play(name+"-walk-left",true)
    }else if(dir=="right"){ 
        this.setVelocityX(speed)
        this.anims.play(name+"-walk-right",true)
    }efmel,f