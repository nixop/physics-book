// Сгенерировано scripts/build-content.mjs. Не редактировать вручную.
import type { Chapter } from '../types';

export const book: Chapter[] = [
  {
    "number": 0,
    "slug": "chapter-0",
    "title": "How Physics Works",
    "pages": 10,
    "accent": "amber",
    "group": "foundations",
    "topics": [
      {
        "id": "0.1",
        "uid": "phy-00-01",
        "slug": "0-1",
        "chapter": 0,
        "order": 1,
        "title": "Physics as Model Building",
        "pages": 3,
        "minutes": 21,
        "level": "foundation",
        "concepts": [
          "Observation, idealization, model, prediction, and experiment.",
          "A model as a useful simplification rather than a literal copy of reality.",
          "Approximations and domains of applicability.",
          "The distinction between a law, a model, a hypothesis, and a measured fact."
        ],
        "summary": "Observation, idealization, model, prediction, and experiment.",
        "labKind": "interactive",
        "interactive": "comparing a body's fall in a vacuum, air, and a viscous medium"
      },
      {
        "id": "0.2",
        "uid": "phy-00-02",
        "slug": "0-2",
        "chapter": 0,
        "order": 2,
        "title": "How a Physics Experiment Is Structured",
        "pages": 3,
        "minutes": 21,
        "level": "foundation",
        "concepts": [
          "The system under study, input parameters, and measured quantities.",
          "Controlling variables.",
          "Repeatability and reproducibility.",
          "Why a single agreement does not prove anything yet."
        ],
        "summary": "The system under study, input parameters, and measured quantities.",
        "labKind": "mini-lab",
        "interactive": "determining what the period of a pendulum depends on"
      },
      {
        "id": "0.3",
        "uid": "phy-00-03",
        "slug": "0-3",
        "chapter": 0,
        "order": 3,
        "title": "How to Use the Interactive Book",
        "pages": 4,
        "minutes": 28,
        "level": "foundation",
        "concepts": [
          "The cycle: predict → run → measure → explain.",
          "Working with sliders, graphs, and virtual instruments.",
          "Keeping a laboratory notebook and saving results.",
          "Three levels of depth: intuition, the core path, and mathematical exploration."
        ],
        "summary": "The cycle: predict → run → measure → explain.",
        "labKind": "interactive",
        "interactive": "a first self-guided model with an unknown relationship"
      }
    ]
  },
  {
    "number": 1,
    "slug": "chapter-1",
    "title": "Measurement and the Mathematical Language",
    "pages": 26,
    "accent": "teal",
    "group": "foundations",
    "topics": [
      {
        "id": "1.1",
        "uid": "phy-01-01",
        "slug": "1-1",
        "chapter": 1,
        "order": 1,
        "title": "Physical Quantities, Units, and Scales",
        "pages": 4,
        "minutes": 28,
        "level": "foundation",
        "concepts": [
          "A numerical value and a unit of measurement.",
          "The SI system and its prefixes.",
          "Dimensions of physical quantities.",
          "Unit conversions and checking equations by dimensional analysis.",
          "Orders of magnitude and Fermi estimates."
        ],
        "summary": "A numerical value and a unit of measurement.",
        "labKind": "interactive",
        "interactive": "a scale spanning from an atomic nucleus to the observable Universe"
      },
      {
        "id": "1.2",
        "uid": "phy-01-02",
        "slug": "1-2",
        "chapter": 1,
        "order": 2,
        "title": "Measurement Uncertainty",
        "pages": 4,
        "minutes": 28,
        "level": "foundation",
        "concepts": [
          "Instrument scale divisions and resolution.",
          "Random and systematic errors.",
          "Absolute and relative uncertainty.",
          "Significant figures and sensible rounding.",
          "Propagation of uncertainty in simple examples."
        ],
        "summary": "Instrument scale divisions and resolution.",
        "labKind": "interactive",
        "interactive": "measuring the same object with instruments of different precision"
      },
      {
        "id": "1.3",
        "uid": "phy-01-03",
        "slug": "1-3",
        "chapter": 1,
        "order": 3,
        "title": "Data, Statistics, and Model Fitting",
        "pages": 4,
        "minutes": 28,
        "level": "foundation",
        "concepts": [
          "A series of measurements, the mean value, and the spread.",
          "Histograms and the normal distribution at an intuitive level.",
          "Outliers: when they may be excluded and when they may not.",
          "Straight-line fitting, residuals, and goodness of fit.",
          "Correlation does not necessarily imply causation."
        ],
        "summary": "A series of measurements, the mean value, and the spread.",
        "labKind": "mini-lab",
        "interactive": "inferring the law of motion from noisy data"
      },
      {
        "id": "1.4",
        "uid": "phy-01-04",
        "slug": "1-4",
        "chapter": 1,
        "order": 4,
        "title": "Functions and Graphs",
        "pages": 4,
        "minutes": 28,
        "level": "foundation",
        "concepts": [
          "Independent and dependent variables.",
          "Direct, inverse, quadratic, and exponential relationships.",
          "Linear and logarithmic scales.",
          "The slope of a graph and the area under it.",
          "Reading the physical meaning of a graph without substituting numbers."
        ],
        "summary": "Independent and dependent variables.",
        "labKind": "interactive",
        "interactive": "linking an equation, a graph, and an animation of a process"
      },
      {
        "id": "1.5",
        "uid": "phy-01-05",
        "slug": "1-5",
        "chapter": 1,
        "order": 5,
        "title": "Scalars and Vectors",
        "pages": 4,
        "minutes": 28,
        "level": "foundation",
        "concepts": [
          "Quantities that have only a value and quantities that also have a direction.",
          "The magnitude and direction of a vector.",
          "Equality of free vectors regardless of their position.",
          "Vector addition and subtraction.",
          "Multiplication of a vector by a scalar."
        ],
        "summary": "Quantities that have only a value and quantities that also have a direction.",
        "labKind": "interactive",
        "interactive": "a geometric vector-addition builder"
      },
      {
        "id": "1.6",
        "uid": "phy-01-06",
        "slug": "1-6",
        "chapter": 1,
        "order": 6,
        "title": "Projections, Components, and Vector Products",
        "pages": 3,
        "minutes": 21,
        "level": "foundation",
        "concepts": [
          "A projection as the 'shadow' of a vector on a chosen axis.",
          "The sign of a projection and a zero projection.",
          "Moving from one axis to two- and three-dimensional coordinates.",
          "Reconstructing a vector from its components.",
          "The dot product as a measure of alignment.",
          "The cross product as an oriented area—an overview."
        ],
        "summary": "A projection as the 'shadow' of a vector on a chosen axis.",
        "labKind": "interactive",
        "interactive": "rotating a vector and the coordinate axes with real-time recalculation of its components"
      },
      {
        "id": "1.7",
        "uid": "phy-01-07",
        "slug": "1-7",
        "chapter": 1,
        "order": 7,
        "title": "The Derivative, the Integral, and Equations of Change",
        "pages": 3,
        "minutes": 21,
        "level": "foundation",
        "concepts": [
          "The derivative as the instantaneous rate of change.",
          "The integral as an accumulated quantity.",
          "The connection between finite increments and continuous change.",
          "A differential equation as a rule governing the evolution of a system.",
          "Numerical solution in small steps."
        ],
        "summary": "The derivative as the instantaneous rate of change.",
        "labKind": "interactive",
        "interactive": "comparing exact motion with a step-by-step numerical simulation"
      }
    ]
  },
  {
    "number": 2,
    "slug": "chapter-2",
    "title": "Kinematics",
    "pages": 26,
    "accent": "blue",
    "group": "motion-matter",
    "topics": [
      {
        "id": "2.1",
        "uid": "phy-02-01",
        "slug": "2-1",
        "chapter": 2,
        "order": 1,
        "title": "Events and Frames of Reference",
        "pages": 4,
        "minutes": 28,
        "level": "foundation",
        "concepts": [
          "A point particle and a model of an extended body.",
          "A reference body, coordinates, and a clock.",
          "An event as a position and an instant in time.",
          "The relativity of rest and motion."
        ],
        "summary": "A point particle and a model of an extended body.",
        "labKind": "interactive",
        "interactive": "the same motion as seen by three observers"
      },
      {
        "id": "2.2",
        "uid": "phy-02-02",
        "slug": "2-2",
        "chapter": 2,
        "order": 2,
        "title": "Position, Trajectory, Distance, and Displacement",
        "pages": 4,
        "minutes": 28,
        "level": "foundation",
        "concepts": [
          "The position vector and the position of a body.",
          "The trajectory and the distance traveled.",
          "The displacement vector.",
          "Why distance and the magnitude of displacement are different."
        ],
        "summary": "The position vector and the position of a body.",
        "labKind": "interactive",
        "interactive": "a route editor that calculates distance and displacement"
      },
      {
        "id": "2.3",
        "uid": "phy-02-03",
        "slug": "2-3",
        "chapter": 2,
        "order": 3,
        "title": "Average and Instantaneous Velocity",
        "pages": 4,
        "minutes": 28,
        "level": "foundation",
        "concepts": [
          "Average speed.",
          "Average velocity.",
          "Instantaneous velocity as a limit and as the slope of a graph.",
          "The direction of velocity along a curved trajectory."
        ],
        "summary": "Average speed.",
        "labKind": "interactive",
        "interactive": "the motion of a point together with the tangent to its position graph"
      },
      {
        "id": "2.4",
        "uid": "phy-02-04",
        "slug": "2-4",
        "chapter": 2,
        "order": 4,
        "title": "Acceleration and Motion Graphs",
        "pages": 5,
        "minutes": 35,
        "level": "foundation",
        "concepts": [
          "Acceleration as a change in the velocity vector.",
          "Speeding up, slowing down, and turning.",
          "The relationship among position, velocity, and acceleration graphs.",
          "Motion with constant acceleration.",
          "Motion with variable acceleration and numerical integration."
        ],
        "summary": "Acceleration as a change in the velocity vector.",
        "labKind": "interactive",
        "interactive": "drawing a graph that a body must then reproduce"
      },
      {
        "id": "2.5",
        "uid": "phy-02-05",
        "slug": "2-5",
        "chapter": 2,
        "order": 5,
        "title": "Free Fall and Projectile Motion",
        "pages": 5,
        "minutes": 35,
        "level": "foundation",
        "concepts": [
          "Acceleration due to gravity.",
          "The independence of horizontal and vertical motion.",
          "Horizontal and angled projectile launches.",
          "Range, height, and time of flight.",
          "The effect of air resistance."
        ],
        "summary": "Acceleration due to gravity.",
        "labKind": "interactive",
        "interactive": "a ballistics sandbox with ideal and realistic modes"
      },
      {
        "id": "2.6",
        "uid": "phy-02-06",
        "slug": "2-6",
        "chapter": 2,
        "order": 6,
        "title": "Relative and Curvilinear Motion",
        "pages": 4,
        "minutes": 28,
        "level": "foundation",
        "concepts": [
          "The addition of velocities.",
          "A boat in a current, an airplane in the wind, and moving rain.",
          "Angular quantities.",
          "Tangential and normal components of acceleration.",
          "The kinematics of circular motion."
        ],
        "summary": "The addition of velocities.",
        "labKind": "interactive",
        "interactive": "choosing a heading in a crosswind or a cross-current"
      }
    ]
  },
  {
    "number": 3,
    "slug": "chapter-3",
    "title": "Dynamics and Newton's Laws",
    "pages": 32,
    "accent": "coral",
    "group": "motion-matter",
    "topics": [
      {
        "id": "3.1",
        "uid": "phy-03-01",
        "slug": "3-1",
        "chapter": 3,
        "order": 1,
        "title": "Interactions and Force Diagrams",
        "pages": 4,
        "minutes": 28,
        "level": "foundation",
        "concepts": [
          "Force as a description of an interaction.",
          "Choosing the system under study.",
          "External and internal influences.",
          "The free-body diagram.",
          "Typical spurious or nonexistent forces introduced in incorrect free-body diagrams."
        ],
        "summary": "Force as a description of an interaction.",
        "labKind": "interactive",
        "interactive": "a force-diagram builder with logic checking"
      },
      {
        "id": "3.2",
        "uid": "phy-03-02",
        "slug": "3-2",
        "chapter": 3,
        "order": 2,
        "title": "Inertia and Newton's First Law",
        "pages": 4,
        "minutes": 28,
        "level": "foundation",
        "concepts": [
          "Why motion does not require a continuous force.",
          "Inertial frames of reference.",
          "Galilean relativity.",
          "Mass as a measure of inertia."
        ],
        "summary": "Why motion does not require a continuous force.",
        "labKind": "interactive",
        "interactive": "the motion of a puck as friction is gradually reduced"
      },
      {
        "id": "3.3",
        "uid": "phy-03-03",
        "slug": "3-3",
        "chapter": 3,
        "order": 3,
        "title": "Newton's Second Law",
        "pages": 5,
        "minutes": 35,
        "level": "foundation",
        "concepts": [
          "The net force.",
          "The relationship among force, mass, and acceleration.",
          "Vector notation and equations along coordinate axes.",
          "Initial conditions and the prediction of motion.",
          "Numerical modeling of a force that depends on position or velocity."
        ],
        "summary": "The net force.",
        "labKind": "interactive",
        "interactive": "carts of different masses acted on by adjustable forces"
      },
      {
        "id": "3.4",
        "uid": "phy-03-04",
        "slug": "3-4",
        "chapter": 3,
        "order": 4,
        "title": "Newton's Third Law",
        "pages": 4,
        "minutes": 28,
        "level": "foundation",
        "concepts": [
          "Interactions occurring in pairs.",
          "Why action and reaction act on different bodies.",
          "Walking, swimming, recoil, and thrust.",
          "Resolving common paradoxes."
        ],
        "summary": "Interactions occurring in pairs.",
        "labKind": "interactive",
        "interactive": "finding force pairs in a complex scene"
      },
      {
        "id": "3.5",
        "uid": "phy-03-05",
        "slug": "3-5",
        "chapter": 3,
        "order": 5,
        "title": "Normal Force, Tension, and Elasticity",
        "pages": 5,
        "minutes": 35,
        "level": "foundation",
        "concepts": [
          "The force of gravity and apparent weight.",
          "The normal force.",
          "Tension in a string.",
          "Hooke's law.",
          "Systems of connected bodies and pulleys.",
          "Apparent weight in an accelerating elevator."
        ],
        "summary": "The force of gravity and apparent weight.",
        "labKind": "interactive",
        "interactive": "a system of weights, springs, strings, and pulleys"
      },
      {
        "id": "3.6",
        "uid": "phy-03-06",
        "slug": "3-6",
        "chapter": 3,
        "order": 6,
        "title": "Friction and Drag",
        "pages": 5,
        "minutes": 35,
        "level": "foundation",
        "concepts": [
          "Static and kinetic friction.",
          "The coefficient of friction and the limits of applicability of the simple model.",
          "Drag proportional to speed and to the square of speed.",
          "Terminal velocity.",
          "A falling skydiver and a moving car."
        ],
        "summary": "Static and kinetic friction.",
        "labKind": "mini-lab",
        "interactive": "determining the drag law from trajectory data"
      },
      {
        "id": "3.7",
        "uid": "phy-03-07",
        "slug": "3-7",
        "chapter": 3,
        "order": 7,
        "title": "Constraints, Circular Motion, and Non-Inertial Frames",
        "pages": 5,
        "minutes": 35,
        "level": "foundation",
        "concepts": [
          "Geometric constraints and constrained motion.",
          "Which real force plays the role of the centripetal force.",
          "A rotating frame of reference.",
          "The centrifugal effect and the Coriolis force.",
          "The Foucault pendulum and atmospheric vortices."
        ],
        "summary": "Geometric constraints and constrained motion.",
        "labKind": "interactive",
        "interactive": "the motion of a body on a rotating platform"
      }
    ]
  },
  {
    "number": 4,
    "slug": "chapter-4",
    "title": "Energy, Momentum, and Rotation",
    "pages": 34,
    "accent": "violet",
    "group": "motion-matter",
    "topics": [
      {
        "id": "4.1",
        "uid": "phy-04-01",
        "slug": "4-1",
        "chapter": 4,
        "order": 1,
        "title": "Work and Power",
        "pages": 4,
        "minutes": 28,
        "level": "foundation",
        "concepts": [
          "Work done by a constant or variable force.",
          "The role of the component of force along the displacement.",
          "Work as the area under a force graph.",
          "Power and the rate of energy transfer."
        ],
        "summary": "Work done by a constant or variable force.",
        "labKind": "interactive",
        "interactive": "moving a load along different trajectories and comparing the work done"
      },
      {
        "id": "4.2",
        "uid": "phy-04-02",
        "slug": "4-2",
        "chapter": 4,
        "order": 2,
        "title": "Kinetic Energy and the Work–Energy Theorem",
        "pages": 4,
        "minutes": 28,
        "level": "foundation",
        "concepts": [
          "The energy of motion.",
          "The relationship between net work and the change in kinetic energy.",
          "Braking distance.",
          "Work in different frames of reference."
        ],
        "summary": "The energy of motion.",
        "labKind": "interactive",
        "interactive": "reconstructing a body's speed from a force graph"
      },
      {
        "id": "4.3",
        "uid": "phy-04-03",
        "slug": "4-3",
        "chapter": 4,
        "order": 3,
        "title": "Potential Energy and Force",
        "pages": 4,
        "minutes": 28,
        "level": "foundation",
        "concepts": [
          "Conservative interactions.",
          "Gravitational and elastic potential energy.",
          "Choosing the zero level.",
          "The potential-energy landscape and equilibrium.",
          "Force as the negative gradient of potential energy (minus the slope in one dimension)."
        ],
        "summary": "Conservative interactions.",
        "labKind": "interactive",
        "interactive": "the motion of a ball through an editable energy landscape"
      },
      {
        "id": "4.4",
        "uid": "phy-04-04",
        "slug": "4-4",
        "chapter": 4,
        "order": 4,
        "title": "Conservation of Energy",
        "pages": 5,
        "minutes": 35,
        "level": "foundation",
        "concepts": [
          "Closed and open systems.",
          "Energy transformations.",
          "Dissipation and the conversion of mechanical energy into internal energy.",
          "Efficiency.",
          "Energy flows and Sankey diagrams."
        ],
        "summary": "Closed and open systems.",
        "labKind": "interactive",
        "interactive": "a roller coaster with a live energy balance"
      },
      {
        "id": "4.5",
        "uid": "phy-04-05",
        "slug": "4-5",
        "chapter": 4,
        "order": 5,
        "title": "Momentum and Impulse",
        "pages": 4,
        "minutes": 28,
        "level": "foundation",
        "concepts": [
          "The momentum of a body.",
          "Impulse as a change in momentum.",
          "Conservation of momentum.",
          "Recoil and rocket propulsion."
        ],
        "summary": "The momentum of a body.",
        "labKind": "interactive",
        "interactive": "a controlled impulsive maneuver in weightlessness"
      },
      {
        "id": "4.6",
        "uid": "phy-04-06",
        "slug": "4-6",
        "chapter": 4,
        "order": 6,
        "title": "Collisions, the Center of Mass, and Rockets",
        "pages": 5,
        "minutes": 35,
        "level": "foundation",
        "concepts": [
          "Elastic and inelastic collisions.",
          "Momentum conservation and, for elastic collisions, conservation of kinetic energy.",
          "The center of mass and the motion of a system as a whole.",
          "A variable-mass system.",
          "The simplest rocket equation."
        ],
        "summary": "Elastic and inelastic collisions.",
        "labKind": "interactive",
        "interactive": "a laboratory for collisions and rocket propulsion"
      },
      {
        "id": "4.7",
        "uid": "phy-04-07",
        "slug": "4-7",
        "chapter": 4,
        "order": 7,
        "title": "Rotational Kinematics and Dynamics",
        "pages": 4,
        "minutes": 28,
        "level": "foundation",
        "concepts": [
          "Angle, angular velocity, and angular acceleration.",
          "Moment of inertia and mass distribution.",
          "Rotational kinetic energy.",
          "Rolling without slipping."
        ],
        "summary": "Angle, angular velocity, and angular acceleration.",
        "labKind": "interactive",
        "interactive": "a race between rolling bodies of equal mass and different shapes"
      },
      {
        "id": "4.8",
        "uid": "phy-04-08",
        "slug": "4-8",
        "chapter": 4,
        "order": 8,
        "title": "Torque and Angular Momentum",
        "pages": 4,
        "minutes": 28,
        "level": "foundation",
        "concepts": [
          "The lever arm and torque.",
          "Static equilibrium.",
          "Angular momentum and its conservation.",
          "Gyroscopic stability and precession.",
          "Symmetries as the source of conservation laws—an overview."
        ],
        "summary": "The lever arm and torque.",
        "labKind": "interactive",
        "interactive": "a virtual gyroscope and a rotating chair"
      }
    ]
  },
  {
    "number": 5,
    "slug": "chapter-5",
    "title": "Gravitation and Celestial Mechanics",
    "pages": 20,
    "accent": "green",
    "group": "motion-matter",
    "topics": [
      {
        "id": "5.1",
        "uid": "phy-05-01",
        "slug": "5-1",
        "chapter": 5,
        "order": 1,
        "title": "Gravitational Field and Potential",
        "pages": 4,
        "minutes": 28,
        "level": "in-depth",
        "concepts": [
          "Newton's law of universal gravitation.",
          "The field of multiple bodies and superposition.",
          "Potential and potential energy.",
          "Acceleration near the surface of a planet."
        ],
        "summary": "Newton's law of universal gravitation.",
        "labKind": "interactive",
        "interactive": "a map of the field and potential around a system of masses"
      },
      {
        "id": "5.2",
        "uid": "phy-05-02",
        "slug": "5-2",
        "chapter": 5,
        "order": 2,
        "title": "Kepler's Laws and Orbits",
        "pages": 4,
        "minutes": 28,
        "level": "in-depth",
        "concepts": [
          "An elliptical orbit.",
          "The equal-areas law.",
          "The relationship between orbital period and orbit size.",
          "An orbit as continuous free fall."
        ],
        "summary": "An elliptical orbit.",
        "labKind": "interactive",
        "interactive": "reconstructing Kepler's laws from the motion of a planet"
      },
      {
        "id": "5.3",
        "uid": "phy-05-03",
        "slug": "5-3",
        "chapter": 5,
        "order": 3,
        "title": "Orbital Energy and Cosmic Velocities",
        "pages": 4,
        "minutes": 28,
        "level": "in-depth",
        "concepts": [
          "Circular and elliptical orbits.",
          "The first and second cosmic velocities: circular-orbit speed and escape speed.",
          "Bound and unbound trajectories.",
          "Changing an orbit with a brief impulse."
        ],
        "summary": "Circular and elliptical orbits.",
        "labKind": "interactive",
        "interactive": "orbital maneuvers and a Hohmann transfer"
      },
      {
        "id": "5.4",
        "uid": "phy-05-04",
        "slug": "5-4",
        "chapter": 5,
        "order": 4,
        "title": "Tides and Rotating Systems",
        "pages": 4,
        "minutes": 28,
        "level": "in-depth",
        "concepts": [
          "The nonuniformity of a gravitational field.",
          "Tidal forces.",
          "Synchronous rotation.",
          "The Roche limit.",
          "Lagrange points at a qualitative level."
        ],
        "summary": "The nonuniformity of a gravitational field.",
        "labKind": "interactive",
        "interactive": "a planet–satellite system with tidal deformations"
      },
      {
        "id": "5.5",
        "uid": "phy-05-05",
        "slug": "5-5",
        "chapter": 5,
        "order": 5,
        "title": "The Many-Body Problem",
        "pages": 4,
        "minutes": 28,
        "level": "in-depth",
        "concepts": [
          "Why the two-body problem has a particularly simple solution.",
          "The mutual influence of three or more bodies.",
          "Stable, quasiperiodic, and chaotic orbits.",
          "Numerical integration of motion."
        ],
        "summary": "Why the two-body problem has a particularly simple solution.",
        "labKind": "mini-lab",
        "interactive": "finding a stable three-body configuration"
      }
    ]
  },
  {
    "number": 6,
    "slug": "chapter-6",
    "title": "Matter, Elasticity, and Fluids",
    "pages": 22,
    "accent": "amber",
    "group": "motion-matter",
    "topics": [
      {
        "id": "6.1",
        "uid": "phy-06-01",
        "slug": "6-1",
        "chapter": 6,
        "order": 1,
        "title": "States of Matter and the Continuum Approximation",
        "pages": 4,
        "minutes": 28,
        "level": "in-depth",
        "concepts": [
          "Solids, liquids, gases, and plasma.",
          "Density and pressure.",
          "Microscopic structure and macroscopic properties.",
          "When matter can be treated as a continuous medium."
        ],
        "summary": "Solids, liquids, gases, and plasma.",
        "labKind": "interactive",
        "interactive": "switching between particle-based and continuum models of a medium"
      },
      {
        "id": "6.2",
        "uid": "phy-06-02",
        "slug": "6-2",
        "chapter": 6,
        "order": 2,
        "title": "Deformation and Strength of Materials",
        "pages": 5,
        "minutes": 35,
        "level": "in-depth",
        "concepts": [
          "Stress and strain.",
          "Elastic and plastic regimes.",
          "Young's modulus.",
          "Shear, bending, and torsion.",
          "Fracture, fatigue, and stress concentrations."
        ],
        "summary": "Stress and strain.",
        "labKind": "interactive",
        "interactive": "a virtual tensile-testing machine for a material specimen"
      },
      {
        "id": "6.3",
        "uid": "phy-06-03",
        "slug": "6-3",
        "chapter": 6,
        "order": 3,
        "title": "Hydrostatics and Buoyancy",
        "pages": 4,
        "minutes": 28,
        "level": "in-depth",
        "concepts": [
          "How pressure varies with depth.",
          "Pascal's principle and the hydraulic press.",
          "Buoyant force.",
          "Conditions for flotation and stability."
        ],
        "summary": "How pressure varies with depth.",
        "labKind": "interactive",
        "interactive": "a floating-vessel design tool"
      },
      {
        "id": "6.4",
        "uid": "phy-06-04",
        "slug": "6-4",
        "chapter": 6,
        "order": 4,
        "title": "Surface Tension and Capillarity",
        "pages": 4,
        "minutes": 28,
        "level": "in-depth",
        "concepts": [
          "Surface energy.",
          "The shape of a droplet.",
          "Wetting and the contact angle.",
          "Capillary rise.",
          "The role of scale: why small organisms interact with water differently."
        ],
        "summary": "Surface energy.",
        "labKind": "interactive",
        "interactive": "a droplet on surfaces with different wettabilities"
      },
      {
        "id": "6.5",
        "uid": "phy-06-05",
        "slug": "6-5",
        "chapter": 6,
        "order": 5,
        "title": "Flow of Real Fluids",
        "pages": 5,
        "minutes": 35,
        "level": "in-depth",
        "concepts": [
          "Volume flow rate and the continuity equation.",
          "Bernoulli's equation and its limitations.",
          "Viscosity and flow through a pipe.",
          "The Reynolds number.",
          "Laminar flow, turbulence, and the boundary layer."
        ],
        "summary": "Volume flow rate and the continuity equation.",
        "labKind": "interactive",
        "interactive": "a pipe with adjustable geometry, flow speed, and fluid viscosity"
      }
    ]
  },
  {
    "number": 7,
    "slug": "chapter-7",
    "title": "Oscillations, Waves, and Sound",
    "pages": 28,
    "accent": "teal",
    "group": "waves-heat",
    "topics": [
      {
        "id": "7.1",
        "uid": "phy-07-01",
        "slug": "7-1",
        "chapter": 7,
        "order": 1,
        "title": "The Harmonic Oscillator",
        "pages": 4,
        "minutes": 28,
        "level": "in-depth",
        "concepts": [
          "Equilibrium position.",
          "Amplitude, period, frequency, and phase.",
          "The spring oscillator and the simple pendulum.",
          "Harmonic motion as the projection of uniform circular motion."
        ],
        "summary": "Equilibrium position.",
        "labKind": "interactive",
        "interactive": "a synchronized view of an oscillator, circular motion, and a graph"
      },
      {
        "id": "7.2",
        "uid": "phy-07-02",
        "slug": "7-2",
        "chapter": 7,
        "order": 2,
        "title": "Energy and Phase Space",
        "pages": 4,
        "minutes": 28,
        "level": "in-depth",
        "concepts": [
          "The exchange between kinetic and potential energy.",
          "The state of a system as a position–velocity pair.",
          "A phase-space trajectory.",
          "What a phase portrait reveals better than a conventional animation."
        ],
        "summary": "The exchange between kinetic and potential energy.",
        "labKind": "interactive",
        "interactive": "plotting phase-space trajectories of an oscillator"
      },
      {
        "id": "7.3",
        "uid": "phy-07-03",
        "slug": "7-3",
        "chapter": 7,
        "order": 3,
        "title": "Damping, Driving, and Resonance",
        "pages": 4,
        "minutes": 28,
        "level": "in-depth",
        "concepts": [
          "Energy dissipation.",
          "Forced oscillations.",
          "Natural frequency and resonance.",
          "The quality factor and the resonance curve.",
          "Parametric resonance—an overview."
        ],
        "summary": "Energy dissipation.",
        "labKind": "mini-lab",
        "interactive": "constructing a resonance curve from measurements"
      },
      {
        "id": "7.4",
        "uid": "phy-07-04",
        "slug": "7-4",
        "chapter": 7,
        "order": 4,
        "title": "How Waves Propagate",
        "pages": 4,
        "minutes": 28,
        "level": "in-depth",
        "concepts": [
          "The transfer of a disturbance without the net transport of matter.",
          "Longitudinal and transverse waves.",
          "Wavelength, frequency, and wave speed.",
          "An intuitive derivation of the wave equation.",
          "Reflection and refraction."
        ],
        "summary": "The transfer of a disturbance without the net transport of matter.",
        "labKind": "interactive",
        "interactive": "a pulse and a periodic wave on a string"
      },
      {
        "id": "7.5",
        "uid": "phy-07-05",
        "slug": "7-5",
        "chapter": 7,
        "order": 5,
        "title": "Superposition and Standing Waves",
        "pages": 4,
        "minutes": 28,
        "level": "in-depth",
        "concepts": [
          "The superposition of waves.",
          "Constructive and destructive interference.",
          "Standing waves, nodes, and antinodes.",
          "Boundary conditions and normal modes."
        ],
        "summary": "The superposition of waves.",
        "labKind": "interactive",
        "interactive": "a string with adjustable end conditions and driving frequency"
      },
      {
        "id": "7.6",
        "uid": "phy-07-06",
        "slug": "7-6",
        "chapter": 7,
        "order": 6,
        "title": "Dispersion and the Fourier Transform",
        "pages": 4,
        "minutes": 28,
        "level": "in-depth",
        "concepts": [
          "A complex waveform as a sum of harmonics.",
          "The spectrum of a signal.",
          "Phase and group velocities.",
          "Dispersion and the spreading of a wave packet."
        ],
        "summary": "A complex waveform as a sum of harmonics.",
        "labKind": "interactive",
        "interactive": "building a pulse from sine waves and observing its propagation"
      },
      {
        "id": "7.7",
        "uid": "phy-07-07",
        "slug": "7-7",
        "chapter": 7,
        "order": 7,
        "title": "Sound and Acoustics",
        "pages": 4,
        "minutes": 28,
        "level": "in-depth",
        "concepts": [
          "Pressure in a sound wave.",
          "Pitch, loudness, and timbre.",
          "Musical instruments and resonators.",
          "Reverberation and room acoustics.",
          "The Doppler effect and shock waves."
        ],
        "summary": "Pressure in a sound wave.",
        "labKind": "interactive",
        "interactive": "a spectrum synthesizer and an acoustic model of a room"
      }
    ]
  },
  {
    "number": 8,
    "slug": "chapter-8",
    "title": "Molecular and Statistical Physics, Thermodynamics",
    "pages": 34,
    "accent": "blue",
    "group": "waves-heat",
    "topics": [
      {
        "id": "8.1",
        "uid": "phy-08-01",
        "slug": "8-1",
        "chapter": 8,
        "order": 1,
        "title": "The Molecular Picture and Temperature",
        "pages": 4,
        "minutes": 28,
        "level": "in-depth",
        "concepts": [
          "Atoms, molecules, and thermal motion.",
          "Diffusion and Brownian motion.",
          "Temperature as a statistical property.",
          "The zeroth law of thermodynamics."
        ],
        "summary": "Atoms, molecules, and thermal motion.",
        "labKind": "interactive",
        "interactive": "mixing two systems at different temperatures"
      },
      {
        "id": "8.2",
        "uid": "phy-08-02",
        "slug": "8-2",
        "chapter": 8,
        "order": 2,
        "title": "Kinetic Theory of an Ideal Gas",
        "pages": 4,
        "minutes": 28,
        "level": "in-depth",
        "concepts": [
          "Pressure as the result of particle collisions.",
          "The relationship between temperature and average kinetic energy.",
          "The ideal-gas equation of state.",
          "The limits of the ideal-gas model."
        ],
        "summary": "Pressure as the result of particle collisions.",
        "labKind": "interactive",
        "interactive": "a particle gas with live pressure, volume, and temperature readings"
      },
      {
        "id": "8.3",
        "uid": "phy-08-03",
        "slug": "8-3",
        "chapter": 8,
        "order": 3,
        "title": "Distributions, Fluctuations, and Diffusion",
        "pages": 4,
        "minutes": 28,
        "level": "in-depth",
        "concepts": [
          "Why molecules do not all have the same speed.",
          "A qualitative view of the Maxwell speed distribution.",
          "Mean values and fluctuations.",
          "Random walks and diffusion."
        ],
        "summary": "Why molecules do not all have the same speed.",
        "labKind": "interactive",
        "interactive": "connecting the random steps of individual particles to the diffusion law"
      },
      {
        "id": "8.4",
        "uid": "phy-08-04",
        "slug": "8-4",
        "chapter": 8,
        "order": 4,
        "title": "Internal Energy and the First Law",
        "pages": 5,
        "minutes": 35,
        "level": "in-depth",
        "concepts": [
          "Internal energy.",
          "Heat and work as modes of energy transfer.",
          "The first law of thermodynamics.",
          "The work done by a gas as an area on a pV diagram.",
          "The heat capacities of a gas."
        ],
        "summary": "Internal energy.",
        "labKind": "interactive",
        "interactive": "freehand construction of a process on a pV diagram"
      },
      {
        "id": "8.5",
        "uid": "phy-08-05",
        "slug": "8-5",
        "chapter": 8,
        "order": 5,
        "title": "Heating, Phase Transitions, and Heat Transfer",
        "pages": 4,
        "minutes": 28,
        "level": "in-depth",
        "concepts": [
          "Specific heat capacity.",
          "Melting, evaporation, and latent heat.",
          "The phase diagram.",
          "Conduction, convection, and thermal radiation."
        ],
        "summary": "Specific heat capacity.",
        "labKind": "mini-lab",
        "interactive": "virtual calorimetry of an unknown material"
      },
      {
        "id": "8.6",
        "uid": "phy-08-06",
        "slug": "8-6",
        "chapter": 8,
        "order": 6,
        "title": "Thermodynamic Processes",
        "pages": 5,
        "minutes": 35,
        "level": "in-depth",
        "concepts": [
          "Isochoric, isobaric, isothermal, and adiabatic processes.",
          "Quasistatic change.",
          "A cycle on a pV diagram.",
          "Work, heat, and internal energy along each leg of a process.",
          "Real and idealized processes."
        ],
        "summary": "Isochoric, isobaric, isothermal, and adiabatic processes.",
        "labKind": "interactive",
        "interactive": "a thermodynamic-cycle builder"
      },
      {
        "id": "8.7",
        "uid": "phy-08-07",
        "slug": "8-7",
        "chapter": 8,
        "order": 7,
        "title": "Entropy and the Second Law",
        "pages": 4,
        "minutes": 28,
        "level": "in-depth",
        "concepts": [
          "Microstates and macrostates.",
          "The probabilistic nature of equilibrium.",
          "Entropy in terms of the number of accessible microstates.",
          "Irreversibility and the arrow of time.",
          "A local decrease in entropy within an open system."
        ],
        "summary": "Microstates and macrostates.",
        "labKind": "interactive",
        "interactive": "statistical mixing of particles with the option to reverse their velocities"
      },
      {
        "id": "8.8",
        "uid": "phy-08-08",
        "slug": "8-8",
        "chapter": 8,
        "order": 8,
        "title": "Heat Engines, Refrigerators, and Free Energy",
        "pages": 4,
        "minutes": 28,
        "level": "in-depth",
        "concepts": [
          "Heat engines and refrigerators.",
          "Efficiency and the coefficient of performance.",
          "The Carnot cycle and the maximum possible efficiency.",
          "The heat pump.",
          "Gibbs or Helmholtz free-energy change as a spontaneity criterion under specified constraints—an overview."
        ],
        "summary": "Heat engines and refrigerators.",
        "labKind": "interactive",
        "interactive": "configuring an engine operating between two thermal reservoirs"
      }
    ]
  },
  {
    "number": 9,
    "slug": "chapter-9",
    "title": "Electricity, Circuits, and Signals",
    "pages": 34,
    "accent": "coral",
    "group": "fields-light",
    "topics": [
      {
        "id": "9.1",
        "uid": "phy-09-01",
        "slug": "9-1",
        "chapter": 9,
        "order": 1,
        "title": "Electric Charge and Matter",
        "pages": 4,
        "minutes": 28,
        "level": "in-depth",
        "concepts": [
          "Positive and negative charge.",
          "Conservation and quantization of charge.",
          "Conductors, dielectrics, and polarization.",
          "Electrostatic induction and grounding."
        ],
        "summary": "Positive and negative charge.",
        "labKind": "interactive",
        "interactive": "transferring charge between objects and exploring electrostatic induction"
      },
      {
        "id": "9.2",
        "uid": "phy-09-02",
        "slug": "9-2",
        "chapter": 9,
        "order": 2,
        "title": "Coulomb's Law and the Electric Field",
        "pages": 4,
        "minutes": 28,
        "level": "in-depth",
        "concepts": [
          "The interaction between point charges.",
          "The principle of superposition.",
          "Electric field strength.",
          "Field lines and their limitations as a visualization."
        ],
        "summary": "The interaction between point charges.",
        "labKind": "interactive",
        "interactive": "a charge-configuration editor with a vector-field display"
      },
      {
        "id": "9.3",
        "uid": "phy-09-03",
        "slug": "9-3",
        "chapter": 9,
        "order": 3,
        "title": "Electric Flux and Gauss's Law",
        "pages": 4,
        "minutes": 28,
        "level": "in-depth",
        "concepts": [
          "Flux through a surface.",
          "Sources of the electric field.",
          "Gauss's law.",
          "Spherical, cylindrical, and planar symmetry.",
          "When Gauss's law simplifies a calculation—and when it remains true but is not computationally useful."
        ],
        "summary": "Flux through a surface.",
        "labKind": "interactive",
        "interactive": "a deformable closed surface enclosing electric charges"
      },
      {
        "id": "9.4",
        "uid": "phy-09-04",
        "slug": "9-4",
        "chapter": 9,
        "order": 4,
        "title": "Electric Potential and Voltage",
        "pages": 4,
        "minutes": 28,
        "level": "in-depth",
        "concepts": [
          "The potential energy of a charge.",
          "Electric potential.",
          "Potential difference.",
          "Equipotential surfaces.",
          "The relationship between the electric field and the spatial variation of potential."
        ],
        "summary": "The potential energy of a charge.",
        "labKind": "interactive",
        "interactive": "moving a test charge across a potential map"
      },
      {
        "id": "9.5",
        "uid": "phy-09-05",
        "slug": "9-5",
        "chapter": 9,
        "order": 5,
        "title": "Conductors, Dielectrics, and Capacitors",
        "pages": 4,
        "minutes": 28,
        "level": "in-depth",
        "concepts": [
          "Electric fields and charge inside and on the surface of a conductor.",
          "Capacitance.",
          "The parallel-plate capacitor.",
          "A dielectric in an electric field.",
          "Energy stored in the electric field."
        ],
        "summary": "Electric fields and charge inside and on the surface of a conductor.",
        "labKind": "interactive",
        "interactive": "a capacitor with adjustable geometry and dielectric material"
      },
      {
        "id": "9.6",
        "uid": "phy-09-06",
        "slug": "9-6",
        "chapter": 9,
        "order": 6,
        "title": "Current, Resistance, and the Microscopic Picture",
        "pages": 4,
        "minutes": 28,
        "level": "in-depth",
        "concepts": [
          "Electric current and current density.",
          "The drift of charge carriers.",
          "Resistance and resistivity.",
          "Ohm's law and its limits.",
          "The temperature dependence of resistance."
        ],
        "summary": "Electric current and current density.",
        "labKind": "interactive",
        "interactive": "the motion and scattering of charge carriers in a conductor"
      },
      {
        "id": "9.7",
        "uid": "phy-09-07",
        "slug": "9-7",
        "chapter": 9,
        "order": 7,
        "title": "Sources, Power, and Energy Transfer",
        "pages": 4,
        "minutes": 28,
        "level": "in-depth",
        "concepts": [
          "Electromotive force.",
          "The internal resistance of a source.",
          "Power and Joule heating.",
          "Load matching.",
          "Why electrical energy is not transported by a ‘supply of electrons in the wire.’"
        ],
        "summary": "Electromotive force.",
        "labKind": "interactive",
        "interactive": "a source with an adjustable load and a live power balance"
      },
      {
        "id": "9.8",
        "uid": "phy-09-08",
        "slug": "9-8",
        "chapter": 9,
        "order": 8,
        "title": "Electric Circuits and Measuring Instruments",
        "pages": 3,
        "minutes": 21,
        "level": "in-depth",
        "concepts": [
          "Series and parallel connections.",
          "Kirchhoff's circuit laws.",
          "Ammeters, voltmeters, and the effect of a measuring instrument on a circuit.",
          "Short circuits and electrical safety."
        ],
        "summary": "Series and parallel connections.",
        "labKind": "interactive",
        "interactive": "a circuit builder with a troubleshooting mode"
      },
      {
        "id": "9.9",
        "uid": "phy-09-09",
        "slug": "9-9",
        "chapter": 9,
        "order": 9,
        "title": "RC Circuits, Filters, and Signals",
        "pages": 3,
        "minutes": 21,
        "level": "in-depth",
        "concepts": [
          "Charging and discharging a capacitor.",
          "The time constant.",
          "An exponential transient response.",
          "The integrating and differentiating behavior of an RC circuit.",
          "Low-pass and high-pass filters."
        ],
        "summary": "Charging and discharging a capacitor.",
        "labKind": "interactive",
        "interactive": "an oscilloscope and an RC circuit with an arbitrary input signal"
      }
    ]
  },
  {
    "number": 10,
    "slug": "chapter-10",
    "title": "Magnetism and Electrodynamics",
    "pages": 28,
    "accent": "violet",
    "group": "fields-light",
    "topics": [
      {
        "id": "10.1",
        "uid": "phy-10-01",
        "slug": "10-1",
        "chapter": 10,
        "order": 1,
        "title": "The Magnetic Field and the Lorentz Force",
        "pages": 4,
        "minutes": 28,
        "level": "in-depth",
        "concepts": [
          "Magnetic poles and the absence of observed magnetic monopoles.",
          "The field of a moving charge.",
          "The Lorentz force.",
          "The direction of the force and the work done by a magnetic field."
        ],
        "summary": "Magnetic poles and the absence of observed magnetic monopoles.",
        "labKind": "interactive",
        "interactive": "a three-dimensional controller for the directions of velocity, field, and force"
      },
      {
        "id": "10.2",
        "uid": "phy-10-02",
        "slug": "10-2",
        "chapter": 10,
        "order": 2,
        "title": "Motion of a Charge in a Magnetic Field",
        "pages": 4,
        "minutes": 28,
        "level": "in-depth",
        "concepts": [
          "Circular and helical trajectories.",
          "The cyclotron frequency.",
          "Crossed electric and magnetic fields.",
          "The mass spectrometer, cyclotron, and magnetosphere."
        ],
        "summary": "Circular and helical trajectories.",
        "labKind": "interactive",
        "interactive": "a chamber for observing the motion of a charged particle"
      },
      {
        "id": "10.3",
        "uid": "phy-10-03",
        "slug": "10-3",
        "chapter": 10,
        "order": 3,
        "title": "Fields Produced by Electric Currents",
        "pages": 4,
        "minutes": 28,
        "level": "in-depth",
        "concepts": [
          "The fields of a straight wire, a current loop, and a solenoid.",
          "The idea behind the Biot–Savart law.",
          "Ampère's law and symmetry.",
          "The interaction between parallel currents."
        ],
        "summary": "The fields of a straight wire, a current loop, and a solenoid.",
        "labKind": "interactive",
        "interactive": "building current configurations and visualizing their magnetic fields"
      },
      {
        "id": "10.4",
        "uid": "phy-10-04",
        "slug": "10-4",
        "chapter": 10,
        "order": 4,
        "title": "Magnetic Materials and the Electric Motor",
        "pages": 4,
        "minutes": 28,
        "level": "in-depth",
        "concepts": [
          "The magnetic dipole moment of a current loop.",
          "Torque.",
          "Diamagnetic, paramagnetic, and ferromagnetic materials.",
          "Magnetic domains and hysteresis.",
          "The operating principle of an electric motor."
        ],
        "summary": "The magnetic dipole moment of a current loop.",
        "labKind": "interactive",
        "interactive": "a motor with visible currents, magnetic field, and torque"
      },
      {
        "id": "10.5",
        "uid": "phy-10-05",
        "slug": "10-5",
        "chapter": 10,
        "order": 5,
        "title": "Electromagnetic Induction",
        "pages": 4,
        "minutes": 28,
        "level": "in-depth",
        "concepts": [
          "Magnetic flux.",
          "Faraday's law.",
          "Lenz's law and conservation of energy.",
          "Eddy currents.",
          "The electric generator."
        ],
        "summary": "Magnetic flux.",
        "labKind": "interactive",
        "interactive": "a magnet and coil with a graph of the induced voltage"
      },
      {
        "id": "10.6",
        "uid": "phy-10-06",
        "slug": "10-6",
        "chapter": 10,
        "order": 6,
        "title": "Inductance, Alternating Current, and the RLC Circuit",
        "pages": 4,
        "minutes": 28,
        "level": "in-depth",
        "concepts": [
          "Self-inductance and energy stored in the magnetic field.",
          "Transient behavior in RL and LC circuits.",
          "RLC resonance.",
          "Phase shifts in an AC circuit.",
          "The transformer and electric-power transmission."
        ],
        "summary": "Self-inductance and energy stored in the magnetic field.",
        "labKind": "interactive",
        "interactive": "a signal generator, oscilloscope, and RLC circuit"
      },
      {
        "id": "10.7",
        "uid": "phy-10-07",
        "slug": "10-7",
        "chapter": 10,
        "order": 7,
        "title": "Maxwell's Equations and Electromagnetic Waves",
        "pages": 4,
        "minutes": 28,
        "level": "in-depth",
        "concepts": [
          "The four ideas behind Maxwell's equations, without premature formalism.",
          "Displacement current.",
          "Self-sustaining electric and magnetic fields.",
          "The speed of light.",
          "The electromagnetic spectrum.",
          "Energy transport by fields and the Poynting vector—an overview."
        ],
        "summary": "The four ideas behind Maxwell's equations, without premature formalism.",
        "labKind": "interactive",
        "interactive": "the generation and propagation of an electromagnetic wave"
      }
    ]
  },
  {
    "number": 11,
    "slug": "chapter-11",
    "title": "Light and Optics",
    "pages": 24,
    "accent": "green",
    "group": "fields-light",
    "topics": [
      {
        "id": "11.1",
        "uid": "phy-11-01",
        "slug": "11-1",
        "chapter": 11,
        "order": 1,
        "title": "The Ray Model, Reflection, and Fermat's Principle",
        "pages": 4,
        "minutes": 28,
        "level": "in-depth",
        "concepts": [
          "The rectilinear propagation of light.",
          "Shadows and penumbrae.",
          "The law of reflection.",
          "The plane mirror.",
          "Stationary optical paths and Fermat's principle."
        ],
        "summary": "The rectilinear propagation of light.",
        "labKind": "interactive",
        "interactive": "finding a stationary-time optical path, including minimum-time cases"
      },
      {
        "id": "11.2",
        "uid": "phy-11-02",
        "slug": "11-2",
        "chapter": 11,
        "order": 2,
        "title": "Refraction, Dispersion, and Total Internal Reflection",
        "pages": 4,
        "minutes": 28,
        "level": "in-depth",
        "concepts": [
          "The speed of light in matter.",
          "Snell's law.",
          "The refractive index.",
          "Dispersion and the rainbow.",
          "Total internal reflection and optical fibers."
        ],
        "summary": "The speed of light in matter.",
        "labKind": "interactive",
        "interactive": "a light ray passing through boundaries between arbitrary media"
      },
      {
        "id": "11.3",
        "uid": "phy-11-03",
        "slug": "11-3",
        "chapter": 11,
        "order": 3,
        "title": "Mirrors and Lenses",
        "pages": 4,
        "minutes": 28,
        "level": "in-depth",
        "concepts": [
          "Spherical mirrors.",
          "Converging and diverging lenses.",
          "Focal points and ray diagrams for image formation.",
          "The thin-lens equation.",
          "Magnification."
        ],
        "summary": "Spherical mirrors.",
        "labKind": "interactive",
        "interactive": "an optical bench for constructing ray diagrams"
      },
      {
        "id": "11.4",
        "uid": "phy-11-04",
        "slug": "11-4",
        "chapter": 11,
        "order": 4,
        "title": "The Eye, Camera, Microscope, and Telescope",
        "pages": 4,
        "minutes": 28,
        "level": "in-depth",
        "concepts": [
          "Image formation on the retina and an image sensor.",
          "Accommodation and refractive errors of the eye.",
          "Aperture, exposure time, and depth of field.",
          "Angular magnification.",
          "Aberrations in optical systems."
        ],
        "summary": "Image formation on the retina and an image sensor.",
        "labKind": "interactive",
        "interactive": "a camera or telescope design tool"
      },
      {
        "id": "11.5",
        "uid": "phy-11-05",
        "slug": "11-5",
        "chapter": 11,
        "order": 5,
        "title": "Interference, Diffraction, and the Resolution Limit",
        "pages": 4,
        "minutes": 28,
        "level": "in-depth",
        "concepts": [
          "Coherence.",
          "The double-slit experiment.",
          "Diffraction by an aperture and a grating.",
          "The relationship between aperture size and the width of the diffraction pattern or diffraction spot.",
          "The Rayleigh criterion."
        ],
        "summary": "Coherence.",
        "labKind": "interactive",
        "interactive": "a smooth transition from geometric optics to diffraction"
      },
      {
        "id": "11.6",
        "uid": "phy-11-06",
        "slug": "11-6",
        "chapter": 11,
        "order": 6,
        "title": "Polarization, Color, and Spectroscopy",
        "pages": 4,
        "minutes": 28,
        "level": "in-depth",
        "concepts": [
          "The polarization of light.",
          "Malus's law.",
          "Color mixing and perception.",
          "Source spectra and spectral lines.",
          "How light reveals the composition and motion of matter."
        ],
        "summary": "The polarization of light.",
        "labKind": "interactive",
        "interactive": "polarizers, a spectral color mixer, and a virtual spectroscope"
      }
    ]
  },
  {
    "number": 12,
    "slug": "chapter-12",
    "title": "Spacetime and Relativity",
    "pages": 26,
    "accent": "amber",
    "group": "modern-physics",
    "topics": [
      {
        "id": "12.1",
        "uid": "phy-12-01",
        "slug": "12-1",
        "chapter": 12,
        "order": 1,
        "title": "Why Classical Mechanics Proved Insufficient",
        "pages": 4,
        "minutes": 28,
        "level": "advanced",
        "concepts": [
          "Galilean velocity addition.",
          "Electrodynamics and the invariance of the speed of light.",
          "The postulates of special relativity.",
          "The absence of an absolute rest frame."
        ],
        "summary": "Galilean velocity addition.",
        "labKind": "interactive",
        "interactive": "an attempt to measure one's own motion relative to the \"aether\""
      },
      {
        "id": "12.2",
        "uid": "phy-12-02",
        "slug": "12-2",
        "chapter": 12,
        "order": 2,
        "title": "Simultaneity and Light Clocks",
        "pages": 4,
        "minutes": 28,
        "level": "advanced",
        "concepts": [
          "Synchronizing distant clocks.",
          "The relativity of simultaneity.",
          "Time dilation.",
          "Proper time."
        ],
        "summary": "Synchronizing distant clocks.",
        "labKind": "interactive",
        "interactive": "light clocks in different frames of reference"
      },
      {
        "id": "12.3",
        "uid": "phy-12-03",
        "slug": "12-3",
        "chapter": 12,
        "order": 3,
        "title": "Length Contraction and Lorentz Transformations",
        "pages": 5,
        "minutes": 35,
        "level": "advanced",
        "concepts": [
          "Measuring the length of a moving body.",
          "Length contraction.",
          "The Lorentz factor.",
          "Transformations of coordinates and time.",
          "Relativistic velocity addition."
        ],
        "summary": "Measuring the length of a moving body.",
        "labKind": "interactive",
        "interactive": "switching between frames of reference on a shared grid of events"
      },
      {
        "id": "12.4",
        "uid": "phy-12-04",
        "slug": "12-4",
        "chapter": 12,
        "order": 4,
        "title": "Spacetime Diagrams and Causality",
        "pages": 5,
        "minutes": 35,
        "level": "advanced",
        "concepts": [
          "Worldlines.",
          "Light cones.",
          "The spacetime interval.",
          "Causally connected and causally disconnected events.",
          "The twin paradox and other apparent contradictions."
        ],
        "summary": "Worldlines.",
        "labKind": "interactive",
        "interactive": "a worldline editor on a Minkowski diagram"
      },
      {
        "id": "12.5",
        "uid": "phy-12-05",
        "slug": "12-5",
        "chapter": 12,
        "order": 5,
        "title": "Relativistic Energy and Momentum",
        "pages": 4,
        "minutes": 28,
        "level": "advanced",
        "concepts": [
          "Momentum at relativistic speeds.",
          "Rest energy.",
          "The energy–momentum relation.",
          "E = mc² and the conversion of mass into other forms of energy.",
          "Four-momentum as an optional advanced topic."
        ],
        "summary": "Momentum at relativistic speeds.",
        "labKind": "interactive",
        "interactive": "particle collisions in different frames of reference"
      },
      {
        "id": "12.6",
        "uid": "phy-12-06",
        "slug": "12-6",
        "chapter": 12,
        "order": 6,
        "title": "From the Equivalence Principle to Curved Spacetime",
        "pages": 4,
        "minutes": 28,
        "level": "advanced",
        "concepts": [
          "The local equivalence of a uniform gravitational field and a uniformly accelerated frame.",
          "Free fall as inertial motion.",
          "Gravitational time dilation.",
          "Geodesics and curvature.",
          "A bridge from special to general relativity."
        ],
        "summary": "The local equivalence of a uniform gravitational field and a uniformly accelerated frame.",
        "labKind": "interactive",
        "interactive": "a laboratory inside an accelerating cabin"
      }
    ]
  },
  {
    "number": 13,
    "slug": "chapter-13",
    "title": "Quantum Physics, Atomic Physics, and Materials Physics",
    "pages": 34,
    "accent": "teal",
    "group": "modern-physics",
    "topics": [
      {
        "id": "13.1",
        "uid": "phy-13-01",
        "slug": "13-1",
        "chapter": 13,
        "order": 1,
        "title": "The Crisis of Classical Physics and the Photon",
        "pages": 4,
        "minutes": 28,
        "level": "advanced",
        "concepts": [
          "Thermal radiation and the ultraviolet catastrophe.",
          "Planck's hypothesis.",
          "The photoelectric effect.",
          "The photon, its energy, and its momentum.",
          "The Compton effect."
        ],
        "summary": "Thermal radiation and the ultraviolet catastrophe.",
        "labKind": "interactive",
        "interactive": "the photoelectric effect with adjustable light frequency and intensity"
      },
      {
        "id": "13.2",
        "uid": "phy-13-02",
        "slug": "13-2",
        "chapter": 13,
        "order": 2,
        "title": "Matter Waves and the Double-Slit Experiment",
        "pages": 4,
        "minutes": 28,
        "level": "advanced",
        "concepts": [
          "The de Broglie hypothesis.",
          "Electron diffraction.",
          "Individual detection events and the build-up of an interference pattern.",
          "Wave–particle duality."
        ],
        "summary": "The de Broglie hypothesis.",
        "labKind": "interactive",
        "interactive": "a double-slit experiment with photons, electrons, and larger particles"
      },
      {
        "id": "13.3",
        "uid": "phy-13-03",
        "slug": "13-3",
        "chapter": 13,
        "order": 3,
        "title": "Quantum State and Measurement",
        "pages": 4,
        "minutes": 28,
        "level": "advanced",
        "concepts": [
          "The wavefunction as a tool for calculating probabilities.",
          "Probability amplitudes.",
          "Superposition.",
          "Measurement and the set of possible outcomes.",
          "Why quantum theory does not require a conscious observer."
        ],
        "summary": "The wavefunction as a tool for calculating probabilities.",
        "labKind": "interactive",
        "interactive": "sequential measurements of two incompatible observables"
      },
      {
        "id": "13.4",
        "uid": "phy-13-04",
        "slug": "13-4",
        "chapter": 13,
        "order": 4,
        "title": "Uncertainty and the Schrödinger Equation",
        "pages": 5,
        "minutes": 35,
        "level": "advanced",
        "concepts": [
          "Wave packets.",
          "The uncertainty relation.",
          "The Schrödinger equation as the law governing the evolution of a quantum state.",
          "A particle in a potential well.",
          "Energy quantization.",
          "Tunneling and the classical limit."
        ],
        "summary": "Wave packets.",
        "labKind": "interactive",
        "interactive": "an editable potential and the particle's eigenstates"
      },
      {
        "id": "13.5",
        "uid": "phy-13-05",
        "slug": "13-5",
        "chapter": 13,
        "order": 5,
        "title": "Spin, Entanglement, and Decoherence",
        "pages": 4,
        "minutes": 28,
        "level": "advanced",
        "concepts": [
          "Spin as an intrinsic quantum property.",
          "Quantum correlations and entanglement.",
          "The idea behind Bell inequalities.",
          "Why entanglement cannot transmit a signal faster than light.",
          "Decoherence and the emergence of classical behavior."
        ],
        "summary": "Spin as an intrinsic quantum property.",
        "labKind": "interactive",
        "interactive": "measurement correlations for a pair of entangled particles"
      },
      {
        "id": "13.6",
        "uid": "phy-13-06",
        "slug": "13-6",
        "chapter": 13,
        "order": 6,
        "title": "Atoms, Molecules, and Spectra",
        "pages": 5,
        "minutes": 35,
        "level": "advanced",
        "concepts": [
          "Rutherford's experiment and the Bohr model as a historical stepping stone.",
          "Atomic orbitals and quantum numbers.",
          "The Pauli exclusion principle and the periodic table.",
          "Chemical bonding at a qualitative level.",
          "Energy transitions, spectra, and lasers."
        ],
        "summary": "Rutherford's experiment and the Bohr model as a historical stepping stone.",
        "labKind": "interactive",
        "interactive": "a builder for energy levels and spectral transitions"
      },
      {
        "id": "13.7",
        "uid": "phy-13-07",
        "slug": "13-7",
        "chapter": 13,
        "order": 7,
        "title": "Solid-State Physics and Semiconductors",
        "pages": 4,
        "minutes": 28,
        "level": "advanced",
        "concepts": [
          "Crystal lattices and collective electron states.",
          "Energy bands.",
          "Conductors, insulators, and semiconductors.",
          "Dopants and the p–n junction.",
          "Diodes, transistors, light-emitting diodes, and solar cells."
        ],
        "summary": "Crystal lattices and collective electron states.",
        "labKind": "interactive",
        "interactive": "a band diagram and current through a p–n junction"
      },
      {
        "id": "13.8",
        "uid": "phy-13-08",
        "slug": "13-8",
        "chapter": 13,
        "order": 8,
        "title": "Quantum Technologies",
        "pages": 4,
        "minutes": 28,
        "level": "advanced",
        "concepts": [
          "Lasers and masers.",
          "Scanning tunneling and electron microscopes.",
          "Magnetic resonance imaging.",
          "An overview of superconductivity.",
          "Qubits, quantum operations, and the limitations of quantum computers."
        ],
        "summary": "Lasers and masers.",
        "labKind": "interactive",
        "interactive": "the state of a single qubit on the Bloch sphere"
      }
    ]
  },
  {
    "number": 14,
    "slug": "chapter-14",
    "title": "Nuclear Physics and Elementary Particle Physics",
    "pages": 22,
    "accent": "blue",
    "group": "modern-physics",
    "topics": [
      {
        "id": "14.1",
        "uid": "phy-14-01",
        "slug": "14-1",
        "chapter": 14,
        "order": 1,
        "title": "The Atomic Nucleus and Binding Energy",
        "pages": 4,
        "minutes": 28,
        "level": "advanced",
        "concepts": [
          "Protons and neutrons.",
          "The strong interaction.",
          "Mass defect and binding energy.",
          "Isotopes and the valley of stability."
        ],
        "summary": "Protons and neutrons.",
        "labKind": "interactive",
        "interactive": "a plot of binding energy per nucleon"
      },
      {
        "id": "14.2",
        "uid": "phy-14-02",
        "slug": "14-2",
        "chapter": 14,
        "order": 2,
        "title": "Radioactivity and the Interaction of Radiation with Matter",
        "pages": 4,
        "minutes": 28,
        "level": "advanced",
        "concepts": [
          "Alpha, beta, and gamma decay.",
          "The probabilistic law of decay and half-life.",
          "Activity, absorbed dose, and equivalent dose.",
          "Shielding and biological effects."
        ],
        "summary": "Alpha, beta, and gamma decay.",
        "labKind": "interactive",
        "interactive": "a statistical simulation of decay and the passage of radiation through matter"
      },
      {
        "id": "14.3",
        "uid": "phy-14-03",
        "slug": "14-3",
        "chapter": 14,
        "order": 3,
        "title": "Nuclear Fission and Reactors",
        "pages": 5,
        "minutes": 35,
        "level": "advanced",
        "concepts": [
          "Fission of a heavy nucleus.",
          "Neutron chain reactions.",
          "Criticality.",
          "The design of a nuclear power reactor.",
          "Decay heat, waste, and safety."
        ],
        "summary": "Fission of a heavy nucleus.",
        "labKind": "interactive",
        "interactive": "controlling a reactor with neutron absorbers or control rods and a moderator"
      },
      {
        "id": "14.4",
        "uid": "phy-14-04",
        "slug": "14-4",
        "chapter": 14,
        "order": 4,
        "title": "Nuclear Fusion",
        "pages": 5,
        "minutes": 35,
        "level": "advanced",
        "concepts": [
          "The Coulomb barrier and quantum tunneling.",
          "Fusion in stars.",
          "The conditions for plasma confinement.",
          "Magnetic and inertial confinement.",
          "The energy balance of a fusion reactor."
        ],
        "summary": "The Coulomb barrier and quantum tunneling.",
        "labKind": "interactive",
        "interactive": "a diagram of plasma ignition conditions"
      },
      {
        "id": "14.5",
        "uid": "phy-14-05",
        "slug": "14-5",
        "chapter": 14,
        "order": 5,
        "title": "Elementary Particles and the Standard Model",
        "pages": 4,
        "minutes": 28,
        "level": "advanced",
        "concepts": [
          "Quarks, leptons, and force carriers.",
          "Antiparticles.",
          "Symmetries and conservation laws.",
          "The Higgs field.",
          "What the Standard Model does not explain."
        ],
        "summary": "Quarks, leptons, and force carriers.",
        "labKind": "interactive",
        "interactive": "a builder for allowed particle decays"
      }
    ]
  },
  {
    "number": 15,
    "slug": "chapter-15",
    "title": "Astrophysics and Cosmology",
    "pages": 26,
    "accent": "coral",
    "group": "universe-complexity",
    "topics": [
      {
        "id": "15.1",
        "uid": "phy-15-01",
        "slug": "15-1",
        "chapter": 15,
        "order": 1,
        "title": "How We Measure the Universe",
        "pages": 4,
        "minutes": 28,
        "level": "advanced",
        "concepts": [
          "Angular sizes and parallax.",
          "Standard candles.",
          "Luminosity, flux, and magnitude.",
          "Spectrum, temperature, composition, and radial velocity.",
          "Redshift."
        ],
        "summary": "Angular sizes and parallax.",
        "labKind": "mini-lab",
        "interactive": "determining the properties of an unknown star from observational data"
      },
      {
        "id": "15.2",
        "uid": "phy-15-02",
        "slug": "15-2",
        "chapter": 15,
        "order": 2,
        "title": "A Star's Equilibrium and Energy",
        "pages": 4,
        "minutes": 28,
        "level": "advanced",
        "concepts": [
          "Gravitational contraction and pressure.",
          "Hydrostatic equilibrium.",
          "Energy transport from the stellar interior.",
          "Thermonuclear reactions in stars.",
          "Solar neutrinos."
        ],
        "summary": "Gravitational contraction and pressure.",
        "labKind": "interactive",
        "interactive": "a model of a star that balances gravity and pressure"
      },
      {
        "id": "15.3",
        "uid": "phy-15-03",
        "slug": "15-3",
        "chapter": 15,
        "order": 3,
        "title": "Stellar Evolution and the Origin of the Elements",
        "pages": 4,
        "minutes": 28,
        "level": "advanced",
        "concepts": [
          "The Hertzsprung–Russell diagram.",
          "The birth of a star.",
          "The main sequence, giants, and supernovae.",
          "Stellar nucleosynthesis.",
          "The origin of elements heavier than iron."
        ],
        "summary": "The Hertzsprung–Russell diagram.",
        "labKind": "interactive",
        "interactive": "the evolutionary track of a star of a specified mass"
      },
      {
        "id": "15.4",
        "uid": "phy-15-04",
        "slug": "15-4",
        "chapter": 15,
        "order": 4,
        "title": "Compact Objects",
        "pages": 4,
        "minutes": 28,
        "level": "advanced",
        "concepts": [
          "White dwarfs and degeneracy pressure.",
          "Neutron stars and pulsars.",
          "Black holes and event horizons.",
          "Accretion disks and jets.",
          "An overview of the information paradox."
        ],
        "summary": "White dwarfs and degeneracy pressure.",
        "labKind": "interactive",
        "interactive": "orbits and redshift near a compact object"
      },
      {
        "id": "15.5",
        "uid": "phy-15-05",
        "slug": "15-5",
        "chapter": 15,
        "order": 5,
        "title": "General Relativity as Observable Physics",
        "pages": 4,
        "minutes": 28,
        "level": "advanced",
        "concepts": [
          "The deflection of light and gravitational lensing.",
          "Orbital precession.",
          "Gravitational time dilation and GPS.",
          "Gravitational waves."
        ],
        "summary": "The deflection of light and gravitational lensing.",
        "labKind": "interactive",
        "interactive": "lensing a distant source with a system of masses"
      },
      {
        "id": "15.6",
        "uid": "phy-15-06",
        "slug": "15-6",
        "chapter": 15,
        "order": 6,
        "title": "Galaxies, Dark Matter, and Large-Scale Structure",
        "pages": 3,
        "minutes": 21,
        "level": "advanced",
        "concepts": [
          "The structure and dynamics of galaxies.",
          "Rotation curves.",
          "Galaxy clusters and gravitational lensing.",
          "The cosmic web.",
          "Observational evidence for dark matter."
        ],
        "summary": "The structure and dynamics of galaxies.",
        "labKind": "interactive",
        "interactive": "comparing the rotation of a galaxy with and without a dark matter halo"
      },
      {
        "id": "15.7",
        "uid": "phy-15-07",
        "slug": "15-7",
        "chapter": 15,
        "order": 7,
        "title": "The Expanding Universe",
        "pages": 3,
        "minutes": 21,
        "level": "advanced",
        "concepts": [
          "The expansion of space and the Hubble–Lemaître law.",
          "The hot Big Bang.",
          "Primordial nucleosynthesis and the cosmic microwave background.",
          "Dark energy.",
          "The observable Universe and cosmological horizons.",
          "Open questions in modern cosmology."
        ],
        "summary": "The expansion of space and the Hubble–Lemaître law.",
        "labKind": "interactive",
        "interactive": "an expanding grid with moving photons and a horizon"
      }
    ]
  },
  {
    "number": 16,
    "slug": "chapter-16",
    "title": "Nonlinearity, Chaos, and the Capstone Laboratory",
    "pages": 12,
    "accent": "violet",
    "group": "universe-complexity",
    "topics": [
      {
        "id": "16.1",
        "uid": "phy-16-01",
        "slug": "16-1",
        "chapter": 16,
        "order": 1,
        "title": "Nonlinearity and Feedback",
        "pages": 3,
        "minutes": 21,
        "level": "advanced",
        "concepts": [
          "Linear models and the superposition principle.",
          "What changes when a relationship becomes nonlinear.",
          "Positive and negative feedback.",
          "Stability and saturation."
        ],
        "summary": "Linear models and the superposition principle.",
        "labKind": "interactive",
        "interactive": "systems with adjustable feedback"
      },
      {
        "id": "16.2",
        "uid": "phy-16-02",
        "slug": "16-2",
        "chapter": 16,
        "order": 2,
        "title": "Phase Portraits, Attractors, and Bifurcations",
        "pages": 3,
        "minutes": 21,
        "level": "advanced",
        "concepts": [
          "The state of a dynamical system.",
          "Fixed points, cycles, and attractors.",
          "Changes in behavior as a parameter is varied continuously.",
          "Bifurcations."
        ],
        "summary": "The state of a dynamical system.",
        "labKind": "interactive",
        "interactive": "constructing a bifurcation diagram"
      },
      {
        "id": "16.3",
        "uid": "phy-16-03",
        "slug": "16-3",
        "chapter": 16,
        "order": 3,
        "title": "Deterministic Chaos",
        "pages": 3,
        "minutes": 21,
        "level": "advanced",
        "concepts": [
          "Sensitivity to initial conditions.",
          "The predictability horizon.",
          "The logistic map and the double pendulum.",
          "The distinction between chaos and randomness.",
          "Fractal structure."
        ],
        "summary": "Sensitivity to initial conditions.",
        "labKind": "interactive",
        "interactive": "two nearly identical double pendulums"
      },
      {
        "id": "16.4",
        "uid": "phy-16-04",
        "slug": "16-4",
        "chapter": 16,
        "order": 4,
        "title": "Capstone Research Laboratory",
        "pages": 3,
        "minutes": 21,
        "level": "advanced",
        "concepts": [
          "Obtaining raw data from an unknown system.",
          "Formulating a hypothesis.",
          "Choosing variables and plotting graphs.",
          "Fitting a model and estimating uncertainty.",
          "Testing the model against new data."
        ],
        "summary": "Obtaining raw data from an unknown system.",
        "labKind": "project",
        "interactive": "reconstructing a physical law without knowing in advance which system generated the data"
      }
    ]
  }
];
