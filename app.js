const scene = new THREE.Scene();

        // Sizes
        const sizes = {
            width: window.innerWidth,
            height: window.innerHeight
        };

        // Camera
        const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
        camera.position.z = 3;
        scene.add(camera);

        // Canvas
        const canvas = document.querySelector('canvas.webgl');

        // Object
        const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
        const cubeMaterial = new THREE.MeshBasicMaterial({
            color: '#ff0000'
        });
        const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
        scene.add(cubeMesh);

        // Renderer
        const renderer = new THREE.WebGLRenderer({
            canvas: canvas
        });
        renderer.setSize(sizes.width, sizes.height);
        renderer.render(scene, camera);

        // Step 1: Set up event listener
        document.addEventListener('mousemove', onDocumentMouseMove);

        // Step 2: Create variables to store cursor position
        let mouseX = 0;
        let mouseY = 0;

        function onDocumentMouseMove(event) {
            // Step 2: Calculate cursor position relative to canvas
            mouseX = (event.clientX / sizes.width) - 0.5;
            mouseY = -(event.clientY / sizes.height - 0.5);
        }
        
        const radius = 3; // Radius of the circle around the cube

        const animate = () => {
            requestAnimationFrame(animate);
        
            // Step 3: Update camera position based on cursor movement
            const thetaX = mouseX * Math.PI * 2; // Convert mouseX to angle in radians (horizontal rotation)
            const thetaY = mouseY * Math.PI * 0.5; // Convert mouseY to angle in radians (vertical rotation)
        
            const radiusXZ = radius * Math.cos(thetaY); // Radius of the circle in the XZ plane
        
            // Calculate the new position for the camera in spherical coordinates
            const x = Math.sin(thetaX) * radiusXZ;
            const z = Math.cos(thetaX) * radiusXZ;
            const y = Math.sin(thetaY) * radius;
        
            camera.position.set(x, y, z); // Set the new camera position
            camera.lookAt(scene.position); // Make the camera always look at the cube's center
        
            // Step 3: Render the scene with the updated camera
            renderer.render(scene, camera);
        };
        
        // Step 3: Start the animation loop
        animate();
        
        