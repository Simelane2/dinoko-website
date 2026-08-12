/* SERVICE TABS */
function showService(id, element) {
  document.querySelectorAll('.service-panel').forEach(function(panel) {
    panel.classList.remove('active');
  });
  document.querySelectorAll('.tab-btn').forEach(function(btn) {
    btn.classList.remove('active');
  });
  document.getElementById(id).classList.add('active');
  element.classList.add('active');
}

/* GALLERY FILTER */
function filterGallery(category, element) {
  document.querySelectorAll('.filter-btn').forEach(function(btn) {
    btn.classList.remove('active');
  });
  element.classList.add('active');

  document.querySelectorAll('.gallery-item').forEach(function(item) {
    if (category === 'all' || item.dataset.category === category) {
      item.classList.remove('hidden');
    } else {
      item.classList.add('hidden');
    }
  });
}

/* FAQ TOGGLE */
function toggleFaq(button) {
  var answer = button.nextElementSibling;
  var isOpen = button.classList.contains('open');

  document.querySelectorAll('.faq-question').forEach(function(q) {
    q.classList.remove('open');
    q.nextElementSibling.classList.remove('open');
  });

  if (!isOpen) {
    button.classList.add('open');
    answer.classList.add('open');
  }
}

/* BACK TO TOP BUTTON */
window.addEventListener('scroll', function() {
  var btn = document.getElementById('backToTop');
  if (window.scrollY > 400) {
    btn.classList.add('visible');
  } else {
    btn.classList.remove('visible');
  }
});

/* VIEW TOGGLE FOR ACADEMY PLATFORM */
function showView(viewId) {
  document.querySelectorAll('.view').forEach(function(view) {
    view.classList.remove('active');
  });
  document.getElementById(viewId).classList.add('active');
  window.scrollTo(0, 0);
}

/* REDIRECT TO ACADEMY FORM */
function goToAcademyForm() {
  showView('academyView');
  setTimeout(function() {
    var form = document.getElementById('training-form');
    if(form) {
      form.scrollIntoView({ behavior: 'smooth' });
    }
  }, 100);
}

/* REDIRECT TO MAIN CONTACT FORM FOR SITE VISIT */
function bookSiteVisit() {
  showView('mainView');
  setTimeout(function() {
    var contact = document.getElementById('contact');
    if(contact) {
      contact.scrollIntoView({ behavior: 'smooth' });
    }
  }, 100);
}
/* ===========================================
   SCROLL REVEAL ANIMATION SCRIPT
=========================================== */

// Function to automatically apply reveal classes to major elements
function setupScrollAnimations() {
  // Select elements you want to animate
  var elementsToReveal = document.querySelectorAll(
    'section h2, section p, .training-intro, .project-card, .reason-card, .course-card, .giving-card, .faq-item, .gallery-item, .business-hours, .inquiry-form, .download-card'
  );

  // Add the 'reveal' class to hide them initially
  elementsToReveal.forEach(function(el) {
    el.classList.add('reveal');
  });

  // Create an observer that watches for when elements enter the screen
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      // If the element is visible on the screen
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Stop observing it once it's revealed so it doesn't repeat
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 }); // Trigger when 10% of the item is visible

  // Tell the observer to watch all the selected elements
  elementsToReveal.forEach(function(el) {
    observer.observe(el);
  });
}

// Run the animation setup when the page loads
window.addEventListener('DOMContentLoaded', setupScrollAnimations);

// Ensure animations reset properly when switching between Main View and Academy View
function setupViewObserver() {
  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.attributeName === 'class') {
        var activeView = document.querySelector('.view.active');
        if (activeView) {
          // Re-run setup for the newly active view
          setupScrollAnimations();
        }
      }
    });
  });

  var views = document.querySelectorAll('.view');
  views.forEach(function(view) {
    observer.observe(view, { attributes: true });
  });
}

window.addEventListener('DOMContentLoaded', setupViewObserver);

/* ===========================================
   3D REALISTIC HIKVISION CAMERA SCRIPT (THREE.JS)
=========================================== */

function init3DCamera() {
  const container = document.getElementById('camera3d-container');
  if (!container) return;

  // 1. Create Scene
  const scene = new THREE.Scene();

  // 2. Create Camera
  const camera = new THREE.PerspectiveCamera(40, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.set(0, 1.5, 6);

  // 3. Create Renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.shadowMap.enabled = true;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;
  container.appendChild(renderer.domElement);

  // 4. Add Studio Lights
  const ambientLight = new THREE.AmbientLight(0x404040, 1.5);
  scene.add(ambientLight);

  const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
  keyLight.position.set(5, 10, 7);
  keyLight.castShadow = true;
  scene.add(keyLight);

  const rimLight = new THREE.DirectionalLight(0x00587a, 2.5); // Teal rim light for edge contrast
  rimLight.position.set(-5, 2, -5);
  scene.add(rimLight);

  const fillLight = new THREE.PointLight(0xf0a500, 1.2, 20); // Gold fill light
  fillLight.position.set(-3, 4, 5);
  scene.add(fillLight);

  // 5. Build the Hikvision-Style Camera Model
  const cameraGroup = new THREE.Group();

  // Materials
  const mattePlastic = new THREE.MeshStandardMaterial({ color: 0x2a2a2a, metalness: 0.1, roughness: 0.8 });
  const glossPlastic = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, metalness: 0.2, roughness: 0.4 });
  const darkMetal = new THREE.MeshStandardMaterial({ color: 0x333333, metalness: 0.9, roughness: 0.3 });
  const glassMat = new THREE.MeshPhysicalMaterial({ 
    color: 0x111122, 
    metalness: 0, 
    roughness: 0.05, 
    transparent: true, 
    opacity: 0.6,
    clearcoat: 1.0,
    clearcoatRoughness: 0.03
  });
  const irLedMat = new THREE.MeshStandardMaterial({ color: 0x880000, emissive: 0xff0000, emissiveIntensity: 0.5, roughness: 0.2 });
  const ledBoardMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.9 });

  // --- MOUNTING BRACKET ---
  const mountBaseGeo = new THREE.BoxGeometry(1.2, 0.2, 1.0);
  const mountBase = new THREE.Mesh(mountBaseGeo, mattePlastic);
  mountBase.position.y = -1.4;
  cameraGroup.add(mountBase);

  const mountNeckGeo = new THREE.CylinderGeometry(0.15, 0.2, 1.0, 16);
  const mountNeck = new THREE.Mesh(mountNeckGeo, mattePlastic);
  mountNeck.position.y = -0.8;
  cameraGroup.add(mountNeck);

  const mountJointGeo = new THREE.SphereGeometry(0.25, 16, 16);
  const mountJoint = new THREE.Mesh(mountJointGeo, mattePlastic);
  mountJoint.position.y = -0.3;
  cameraGroup.add(mountJoint);

  // Arm extending to the camera body
  const armGeo = new THREE.BoxGeometry(0.2, 0.8, 0.2);
  const arm = new THREE.Mesh(armGeo, mattePlastic);
  arm.position.set(0, 0.1, 0);
  cameraGroup.add(arm);

  // --- CAMERA BODY (Bullet Shape) ---
  const bodyGeo = new THREE.CylinderGeometry(0.45, 0.4, 2.2, 32);
  const body = new THREE.Mesh(bodyGeo, mattePlastic);
  body.rotation.z = Math.PI / 2; // Lay horizontally
  body.position.set(0.2, 0.3, 0);
  cameraGroup.add(body);

  // Front Bezel (where lens and IRs sit)
  const bezelGeo = new THREE.CylinderGeometry(0.48, 0.45, 0.3, 32);
  const bezel = new THREE.Mesh(bezelGeo, glossPlastic);
  bezel.rotation.z = Math.PI / 2;
  bezel.position.set(1.35, 0.3, 0);
  cameraGroup.add(bezel);

  // --- LENS ASSEMBLY ---
  // Lens Outer Ring
  const lensRingGeo = new THREE.CylinderGeometry(0.28, 0.28, 0.15, 32);
  const lensRing = new THREE.Mesh(lensRingGeo, darkMetal);
  lensRing.rotation.z = Math.PI / 2;
  lensRing.position.set(1.45, 0.3, 0);
  cameraGroup.add(lensRing);

  // Inner Glass Lens (Deep)
  const lensGlassGeo = new THREE.SphereGeometry(0.24, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2);
  const lensGlass = new THREE.Mesh(lensGlassGeo, glassMat);
  lensGlass.rotation.z = -Math.PI / 2;
  lensGlass.position.set(1.48, 0.3, 0);
  cameraGroup.add(lensGlass);

  // Inner Lens Reflection (Fake depth)
  const innerLensGeo = new THREE.CircleGeometry(0.15, 32);
  const innerLensMat = new THREE.MeshStandardMaterial({ color: 0x000011, metalness: 0.8, roughness: 0.2 });
  const innerLens = new THREE.Mesh(innerLensGeo, innerLensMat);
  innerLens.position.set(1.36, 0.3, 0);
  innerLens.rotation.y = Math.PI / 2;
  cameraGroup.add(innerLens);

  // --- IR LED RING (Hikvision Style) ---
  const irBoardGeo = new THREE.RingGeometry(0.32, 0.46, 32);
  const irBoard = new THREE.Mesh(irBoardGeo, ledBoardMat);
  irBoard.position.set(1.5, 0.3, 0);
  irBoard.rotation.y = Math.PI / 2;
  cameraGroup.add(irBoard);

  // Create array of IR LEDs around the lens
  for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * Math.PI * 2;
    const irLedGeo = new THREE.CircleGeometry(0.04, 16);
    const irLed = new THREE.Mesh(irLedGeo, irLedMat);
    
    // Position in a circle on the Y/Z plane
    const radius = 0.38;
    irLed.position.set(
      1.52, // X position (front of bezel)
      0.3 + Math.cos(angle) * radius, // Y position
      Math.sin(angle) * radius // Z position
    );
    irLed.rotation.y = Math.PI / 2;
    cameraGroup.add(irLed);
  }

  // --- SUN SHIELD / VISOR ---
  // Using a half-cylinder to create a realistic curved sun visor
  const visorGeo = new THREE.CylinderGeometry(0.55, 0.55, 2.4, 32, 1, false, 0, Math.PI);
  const visor = new THREE.Mesh(visorGeo, glossPlastic);
  visor.rotation.z = Math.PI / 2; // Lay horizontally
  visor.rotation.y = Math.PI; // Flip to cover the top
  visor.position.set(0.1, 0.55, 0);
  cameraGroup.add(visor);

  // Cable at the back
  const cableGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.4, 8);
  const cable = new THREE.Mesh(cableGeo, mattePlastic);
  cable.rotation.z = Math.PI / 2;
  cable.position.set(-1.25, 0.3, 0);
  cameraGroup.add(cable);

  scene.add(cameraGroup);

  // 6. Orbit Controls (Drag to Rotate)
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 1.5; // Slow left-to-right roll
  controls.enableZoom = false; // Disable zoom so scrolling the page works
  controls.enablePan = false;
  controls.minPolarAngle = Math.PI / 3; // Prevent going under the floor
  controls.maxPolarAngle = Math.PI / 2.1;

  // 7. Animation Loop
  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }
  animate();

  // 8. Resize Handler
  window.addEventListener('resize', function() {
    if (container.clientWidth > 0) {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    }
  });
}

// Initialize 3D camera when the page loads
window.addEventListener('DOMContentLoaded', init3DCamera);
 

 

  

 

 
