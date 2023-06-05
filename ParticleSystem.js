function ParticleSystem(program, numParticles, position, initialVelocity, groundHeight, velocityRandomness = [0,0,0], colorRandomness = false, minPointSize = 5.0, maxPointSize = 5.0){
    this.numParticles = numParticles;
    this.particleArray = [];
    this.pointsArray = [];
    this.colorsArray = [];
    this.pointSizesArray = [];
    this.program = program;
    this.position = position;
    this.initialVelocity = initialVelocity;
    this.velocityRandomness = velocityRandomness;
    this.colorRandomness = colorRandomness;
    this.minPointSize = minPointSize;
    this.maxPointSize = maxPointSize;
    this.groundHeight = groundHeight;
    this.modelMatrix = mat4.create();

    this.addParticle = function(p){
        
        this.particleArray.push(p);
        this.pointsArray.push(p.position);
        this.colorsArray.push(p.color);
        this.pointSizesArray.push(p.pointSize);
    }
        
    //add particles with random initial velocities, point size and color to the particle system. 
    //their positions are the same as they will spawn from a single point
    for(var i = 0; i < numParticles; i++){
        
        var randomParticle = new Particle();

        for(var j=0; j < 3; j++){
            randomParticle.position[j] = this.position[j];
            randomParticle.velocity[j] = randomRange(this.initialVelocity[j] - this.velocityRandomness[j], this.initialVelocity[j] + this.velocityRandomness[j] );
        }

        if(colorRandomness){
            for(var j=0; j < 3; j++){
                randomParticle.color[j] = Math.random();
            } 
        }

        randomParticle.pointSize = randomRange(this.minPointSize, this.maxPointSize);

        this.addParticle(randomParticle);
    }

    this.pointSizeBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.pointSizeBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.pointSizesArray), gl.STATIC_DRAW);

    this.colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(flatten(this.colorsArray)), gl.STATIC_DRAW);

    this.vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(flatten(this.pointsArray)), gl.STATIC_DRAW);

    window.particleSystems.push(this);

   
    this.renderParticleSystem = function(camera = window.mainCamera){
        
        this.program.prepareRender(this.modelMatrix, camera); 

        gl.bindBuffer(gl.ARRAY_BUFFER, this.pointSizeBuffer);        
        gl.enableVertexAttribArray(this.program.pointSizeAttribute);
        gl.vertexAttribPointer(this.program.pointSizeAttribute, 1, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);        
        gl.enableVertexAttribArray(this.program.vertexColorAttribute);
        gl.vertexAttribPointer(this.program.vertexColorAttribute, 3, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);        
        gl.enableVertexAttribArray(this.program.vertexPositionAttribute);
        gl.vertexAttribPointer(this.program.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);

        gl.drawArrays(gl.POINTS, 0, this.numParticles);
        
    }

    //update each particle in the particle system
    this.updateParticleSystem = function(groundHeight){
        
        for(var i = 0; i< this.numParticles; i++){
            this.particleArray[i].update(groundHeight);
        }
    }
}

function drawParticleSystems(){
    for(var i=0; i<window.particleSystems.length; i++){

        window.particleSystems[i].updateParticleSystem(window.particleSystems[i].groundHeight); 

        gl.bindBuffer(gl.ARRAY_BUFFER, window.particleSystems[i].vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(flatten(window.particleSystems[i].pointsArray)), gl.STATIC_DRAW);
    
        window.particleSystems[i].renderParticleSystem();
    }
}

if(!window.particleSystems){
    window.particleSystems = [];
}


