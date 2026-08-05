export const CreateNinjaAndAtaacks=(secne,x,y,name)=>{
    console.log(secne,x,y)
    let player=secne.physics.add.sprite(x,y,name)
    player.setCollideWorldBounds(true);
    return player

}