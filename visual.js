const version = "0.0.1";
// Global variables
let CANVAS, CTX, MESSAGES;
let MOUSE = {
    x: null,
    y: null,
    radius: null
}
// create the Arrays
// they get multidimensional later
let LIGHTS = [];
let PARTICLE = [];

// Handle the mousemove event
// and check if a FlashLight is attached to the mouse
window.onmousemove = function(){
    MOUSE.y = window.event.clientY
    MOUSE.x = window.event.clientX
    for(var i = 0; i < LIGHTS.length; i++){
        if(LIGHTS[i].mouseAttach == true){
            // set the Light if it is attached
            var obj = document.getElementById((LIGHTS[i].type+LIGHTS[i].name))
            obj.style.left = MOUSE.x+"px";
            obj.style.top = MOUSE.y+"px";
        }
    }
}

class Visual{
    constructor(mouseRadius, canvasName, z_index, backgroundColor, message){
        MESSAGES = message;
        // if message is not given set it to true
        if(message == undefined){
            MESSAGES=true
        }
        // get the canvas
        CANVAS = document.querySelector(canvasName);
        CTX = CANVAS.getContext("2d");
        // finish the global MOUSE-Array
        MOUSE = {
            x: null,
            y: null,
            radius: mouseRadius
        }
        // set the height and all of the Canvas
        // height and width not with style to
        // create a canvas that has a solotion as the screen
        CANVAS.height = window.innerHeight;
        CANVAS.width = window.innerWidth;
        CANVAS.style.position = "fixed";
        CANVAS.style.zIndex = z_index;
        CANVAS.style.background = backgroundColor;
        CANVAS.style.left = "0px";
        CANVAS.style.top = "0px";
        // Print all if messages is on
        if(MESSAGES){
            console.log("Version: "+version+
            "\nCanvas Name: "+canvasName+
            "\nRadius set to the Mouse: "+mouseRadius+
            "\nBackground: "+backgroundColor+
            "\nz-index: "+z_index+"\n\n");
        }
    }

    // FlashLight effect, here Because of it creates an DOM-Element, always accessable
    flashLight( tempradius, tempposition, tempheight, tempwidth, tempmouseAttach, tempmovement, PosX, PosY, tempduration){
        /* Methods for tempmovement
           Center | Left | Right | Top | Bottom | LeftBottom | RightBottom | LeftTop | RightTop
                    Variables here with temp --- to get no conflict with the names of the array
                    Array is more important than the Initialising
                    there we get later the Variables from 
        */
        // access to FLASHLIGHT-Array
        // FLASHLIGHT[0][1].radius

        // Create a DOM-Element
        var flashLight = document.createElement("div");

        // Create the ID of the DOM-Element
        var tempname = LIGHTS.length;

        // Insert every into the Array to have it accessable
        LIGHTS.push({
            type: "flashLight",
            name: tempname,
            radius: tempradius,
            position: tempposition,
            height: tempheight,
            width: tempwidth,
            intensity: null,
            color: null,
            mouseAttach: tempmouseAttach,
            movement: tempmovement,
            duration: tempduration
        });

        // Renaming for better Readability
        var radius = tempradius;
        var position = tempposition;
        var height = tempheight;
        var width = tempwidth;
        var mouseAttach = tempmouseAttach;
        var movement = tempmovement;
        var duration = tempduration;
        // Check if a explicit Position is given or not and if set it
        if(PosX != null && PosY !=null){
            flashLight.style.top = PosY+"%";
            flashLight.style.left = PosX+"%";
        } else {
            flashLight.style.left = "0%";
            flashLight.style.top = "0%";
        }
        // if movement is not given means that it meight be attached to the Mouse or forgot to set
        // To avoid a black screen center it 
        if(!movement){
            flashLight.style.left = "50%";
            flashLight.style.top = "50%";
        }
        // Set every thing to the DOM-Element
        flashLight.setAttribute("id", "flashLight"+tempname)
        flashLight.style.width = width+"px";
        flashLight.style.height = height+"px";
        flashLight.style.position = position;
        flashLight.style.zIndex = 1000;
        flashLight.style.pointerEvents = "none";
        flashLight.style.transformOrigin = "center";
        flashLight.style.transform = "translate(-50%, -50%)";
        flashLight.style.background = "radial-gradient(rgba(0,0,0,0)"+(radius/10)+"%,rgba(0,0,0,0.25)"+(radius/5)+"%,rgba(0,0,0,0.7)"+(radius/2.5)+"%,rgba(0,0,0,1)"+(radius/2)+"%";
        // and append it
        // maybe add a variable to the constructor to append it to an explicit element
        // Need to be stored global
        document.querySelector("body").appendChild(flashLight);
        // if message on and atteched to mouse print to the Console
        // and set transform origin to center
        if(mouseAttach){
            if(MESSAGES){
                console.log("flashLight Attached");
            }
            flashLight.style.transformOrigin = "center";
        }
    }
    spotLight( tempradius, tempcolor, tempposition, tempmouseAttach, tempmovement, PosX, PosY, tempduration){
        /* Methods for tempmovement
        Center | Left | Right | Top | Bottom | LeftBottom | RightBottom | LeftTop | RightTop
                 Variables here with temp --- to get no conflict with the names of the array
                 Array is more important than the Initialising
                 there we get later the Variables from 
        */
        // access to FLASHLIGHT-Array
        // FLASHLIGHT[0][1].radius

        // Create a DOM-Element
        var spotLight = document.createElement("div");

        // Create the ID of the DOM-Element
        var tempname = LIGHTS.length;

        // Insert every into the Array to have it accessable
        LIGHTS.push({
            type: "spotLight",
            name: tempname,
            radius: tempradius,
            position: tempposition,
            height: tempradius*2,
            width: tempradius*2,
            intensity: null,
            color: tempcolor,
            mouseAttach: tempmouseAttach,
            movement: tempmovement,
            duration: tempduration
        });

        // Renaming for better Readability
        var color = tempcolor;
        var radius = tempradius;
        var position = tempposition;
        var mouseAttach = tempmouseAttach;
        var movement = tempmovement;
        var duration = tempduration;
        // Check if a explicit Position is given or not and if set it
        if(PosX != null && PosY !=null){
            spotLight.style.top = PosY+"%";
            spotLight.style.left = PosX+"%";
        } else {
            spotLight.style.left = "0%";
            spotLight.style.top = "0%";
        }
        // Set every thing to the DOM-Element
        spotLight.setAttribute("id", "spotLight"+tempname)
        spotLight.style.width = radius*2+"px";
        spotLight.style.height = radius*2+"px";
        spotLight.style.position = position;
        spotLight.style.zIndex = 1;
        spotLight.style.pointerEvents = "none";
        spotLight.style.transformOrigin = "center";
        spotLight.style.borderRadius = radius+"px";
        spotLight.style.transform = "translate(-50%, -50%)";
        spotLight.style.background = "radial-gradient("+color+" 0%,"+color+" 100%)";
        // and append it
        // maybe add a variable to the constructor to append it to an explicit element
        // Need to be stored global
        document.querySelector("body").appendChild(spotLight);
        // if message on and atteched to mouse print to the Console
        // and set transform origin to center
        if(mouseAttach){
            if(MESSAGES){
                console.log("spotLight Attached");
            }
            spotLight.style.transformOrigin = "center";
        }
    }
    softLight( tempradius, tempcolor, tempintensity, tempposition, tempmouseAttach, tempmovement, PosX, PosY, tempduration){
        /* Methods for tempmovement
        Center | Left | Right | Top | Bottom | LeftBottom | RightBottom | LeftTop | RightTop
                 Variables here with temp --- to get no conflict with the names of the array
                 Array is more important than the Initialising
                 there we get later the Variables from 
        */
        // access to FLASHLIGHT-Array
        // FLASHLIGHT[0][1].radius

        // Create a DOM-Element
        var softLight = document.createElement("div");

        // Create the ID of the DOM-Element
        var tempname = LIGHTS.length;

        // Insert every into the Array to have it accessable
        LIGHTS.push({
            type: "softLight",
            name: tempname,
            radius: tempradius,
            position: tempposition,
            height: tempradius*2,
            width: tempradius*2,
            intensity: tempintensity,
            color: tempcolor,
            mouseAttach: tempmouseAttach,
            movement: tempmovement,
            duration: tempduration
        });

        // Renaming for better Readability
        var intensity = tempintensity;
        var color = tempcolor;
        var radius = tempradius;
        var position = tempposition;
        var mouseAttach = tempmouseAttach;
        var movement = tempmovement;
        var duration = tempduration;
        // Check if a explicit Position is given or not and if set it
        if(PosX != null && PosY !=null){
            softLight.style.top = PosY+"%";
            softLight.style.left = PosX+"%";
        } else {
            softLight.style.left = "0%";
            softLight.style.top = "0%";
        }
        // Set every thing to the DOM-Element
        softLight.setAttribute("id", "softLight"+tempname)
        softLight.style.width = radius*2+"px";
        softLight.style.height = radius*2+"px";
        softLight.style.position = position;
        softLight.style.zIndex = 1;
        softLight.style.pointerEvents = "none";
        softLight.style.transformOrigin = "center";
        softLight.style.borderRadius = radius+"px";
        softLight.style.transform = "translate(-50%, -50%)";
        softLight.style.background = "radial-gradient("+color+" 0%, rgba(0,0,0,0) "+intensity+"%)";
        // and append it
        // maybe add a variable to the constructor to append it to an explicit element
        // Need to be stored global
        document.querySelector("body").appendChild(softLight);
        // if message on and atteched to mouse print to the Console
        // and set transform origin to center
        if(mouseAttach){
            if(MESSAGES){
                console.log("softLight Attached");
            }
            softLight.style.transformOrigin = "center";
        }
    }
    startLight(id, move, speed, yoyo){
        if(id != undefined){
            // Single Light move
            // Check if Mouse Attched
            if(LIGHTS[id].mouseAttach){
                console.error("Object: "+LIGHTS[id].type+LIGHTS[id].name+" is attached to the Mouse"+
                "\n Something like this is deactivated!\n    Were Sorry");
            } else {
                var obj = document.getElementById((LIGHTS[id].type+id))

                // Check if variables given
                if(speed==undefined){
                    var speed = LIGHTS[id].duration;
                }
                if(move==undefined){
                    var move = LIGHTS[id].movement;
                }
                if(yoyo){
                    var ReposX = obj.style.left;
                    var ReposY = obj.style.top;
                }
                // Set Easing
                obj.style.transition = "ease-in-out "+speed+"s";
                console.log(obj.style.transition);
                // Presets
                setTimeout(() => {
                    if(move=="center"){
                        obj.style.top = "50%";
                        obj.style.left = "50%";
                    } else if(move=="right"){
                        obj.style.top = "50%";
                        obj.style.left = "100%";
                    }
                }, 10);

                // Yoyo
                if(yoyo){
                    setTimeout(() => {
                        obj.style.top = ReposY;
                        obj.style.left = ReposX;
                    }, speed*1000);
                }
            }
        } else {
            // All Lights move
            if(MESSAGES){
                console.warn("Your starting every Light Movement at once."+
                "\n to Select a special Light enter the Number from the ID!"+
                "\n\n <div id='spotLight23'> then take the 23 to get this FlashLight")
            }
        }
    }
    particle(color, radius, PosX, PosY, collisionMouse, collisionOther, collisionBorder, name){
        this.color = color;
        this.radius = radius;
        this.PosX = PosX;
        this.PosY = PosY;
        this.collisonMouse = collisionMouse;
        this.collisonOther = collisionOther;
        this.collisionBorder = collisionBorder;
        this.name = name;
        PARTICLE.push({
            name: this.name,
            color: this.color,
            radius: this.radius,
            PosX: this.PosX,
            PosY: this.PosY,
            collisionMouse: this.collisionMouse,
            collisionOther: this.collisonOther,
            collisionBorder: this.collisionBorder,
        })
        console.log(PARTICLE);
    }
}
