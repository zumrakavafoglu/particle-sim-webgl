function Particle(color = [1,1,1], position = [0,0,0], velocity = [0,0,0], force = [0,0,0], pointSize = 5.0, friction = 0.2, bounciness = 0.7) {

    this.mass = 1;
    this.pointSize = pointSize;
    this.color = color;

    this.position = position;
    this.velocity = velocity;

    //net force acting on the particle
    this.force = force;
    //bounciness coefficient between [0,1]
    this.bounciness = bounciness;
    //friction coefficient between [0,1]
    this.friction = friction;

    this.update = function(groundHeight){

        this.applyGravity();
        this.collisionWithGround(groundHeight);
        
        //update the position of the particle with the new velocity
        add(this.position, scaleArray(dt,this.velocity));
        //update the velocity with the force
        add(this.velocity, scaleArray(dt/this.mass,this.force));
    } 

    this.applyGravity = function(){
        //add gravitational force to the net force
        this.force[1] = - this.mass * g;            
    }

    //simple collision detection and response for collision with the ground
    this.collisionWithGround = function(groundHeight){

        if(this.position[1] + dt*this.velocity[1] < groundHeight){
            //just a trick to stop the particle if the velocity is below a certain threshold
            //this prevents it from flickering forever
            if(this.velocity[1] > -stopVelocity){
                this.velocity = [0,0,0];
                this.position[1] = groundHeight ;
            }
            //update the velocities with the formula (1-friction)*V_T - bounciness*V_N 
            //V_N is normal component and V_T is tangential component of the velocity vector
            //V_N = (0,velocity[1],0) and V_T = (velocity[0],0,velocity[2]) as we calculate the collision with the ground
            else{
                this.velocity[1] *= -bounciness;
                this.velocity[0] *= (1.0-friction);   
                this.velocity[2] *= (1.0-friction);                    
            }
        }
    }
}

var g = 9.81;
//time step for Euler integration
var dt = 0.01;
var stopVelocity = 0.5