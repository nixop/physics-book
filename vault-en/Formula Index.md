---
type: reference
language: en
tags:
  - physics
  - formulas
---

# Formula Index

An equation is useful together with its physical meaning and range of validity.

## Normalized Model Residual

$$z=\frac{x_{\mathrm{obs}}-x_{\mathrm{model}}}{\sqrt{\sigma_{\mathrm{obs}}^2+\sigma_{\mathrm{model}}^2}}$$

- **Meaning:** Shows how many combined standard uncertainties separate an observation from the model's prediction.
- **Conditions:** The uncertainties must be standard, independent, and approximately normally distributed; covariance is required when they are correlated.
- **Units:** z: dimensionless; x and σ: the same SI units
- **Related cards:** [[00 · How Physics Works/0.1 · Physics as Model Building|0.1]], [[00 · How Physics Works/0.2 · How a Physics Experiment Is Structured|0.2]]

## Propagation of Independent Uncertainties

$$\sigma_f^2\approx\sum_i\left(\frac{\partial f}{\partial x_i}\right)^2\sigma_{x_i}^2$$

- **Meaning:** Estimates the standard uncertainty of a calculated quantity from the uncertainties of the input data.
- **Conditions:** Linearization is valid for small uncertainties; the input quantities are uncorrelated, otherwise covariance terms must be added.
- **Units:** σ_f: the SI unit of f; each term in the sum: the square of the unit of f
- **Related cards:** [[01 · Measurement and the Mathematical Language/1.2 · Measurement Uncertainty|1.2]], [[01 · Measurement and the Mathematical Language/1.3 · Data, Statistics, and Model Fitting|1.3]]

## Dot Product of Vectors

$$\mathbf a\cdot\mathbf b=|\mathbf a|\,|\mathbf b|\cos\theta=\sum_i a_i b_i$$

- **Meaning:** Relates the geometric angle between vectors to their components and isolates the longitudinal component.
- **Conditions:** The component-sum form is written in an orthonormal Euclidean basis.
- **Units:** the product of the SI units of quantities a and b
- **Related cards:** [[01 · Measurement and the Mathematical Language/1.5 · Scalars and Vectors|1.5]], [[01 · Measurement and the Mathematical Language/1.6 · Projections, Components, and Vector Products|1.6]]

## Instantaneous Velocity and Acceleration

$$\mathbf v=\frac{d\mathbf r}{dt},\qquad\mathbf a=\frac{d\mathbf v}{dt}=\frac{d^2\mathbf r}{dt^2}$$

- **Meaning:** Velocity gives the rate of change of position, while acceleration gives the rate of change of velocity.
- **Conditions:** The trajectory must be differentiable with respect to time in the chosen frame of reference.
- **Units:** r: m; v: m/s; a: m/s²
- **Related cards:** [[02 · Kinematics/2.3 · Average and Instantaneous Velocity|2.3]], [[02 · Kinematics/2.4 · Acceleration and Motion Graphs|2.4]]

## Motion with Constant Acceleration

$$\mathbf v(t)=\mathbf v_0+\mathbf a t,\qquad\mathbf r(t)=\mathbf r_0+\mathbf v_0t+\frac12\mathbf a t^2$$

- **Meaning:** Gives a body's velocity and position as functions of time when its acceleration remains constant.
- **Conditions:** Acceleration is constant in both magnitude and direction throughout the interval considered; time is measured from the initial state.
- **Units:** r: m; v: m/s; a: m/s²; t: s
- **Related cards:** [[02 · Kinematics/2.4 · Acceleration and Motion Graphs|2.4]], [[02 · Kinematics/2.5 · Free Fall and Projectile Motion|2.5]]

## Newton's Second Law

$$\sum\mathbf F=\frac{d\mathbf p}{dt};\qquad\sum\mathbf F=m\mathbf a\quad(m=\mathrm{const})$$

- **Meaning:** The net external force determines the change in a body's momentum.
- **Conditions:** This form applies in an inertial frame of reference; the ma form requires constant mass and nonrelativistic motion.
- **Units:** F: N; p: kg·m/s; m: kg; a: m/s²
- **Related cards:** [[03 · Dynamics and Newton's Laws/3.2 · Inertia and Newton's First Law|3.2]], [[03 · Dynamics and Newton's Laws/3.3 · Newton's Second Law|3.3]]

## Dry Friction

$$|\mathbf F_s|\leq\mu_s N,\qquad\mathbf F_k=-\mu_kN\frac{\mathbf v_{\mathrm{rel}}}{|\mathbf v_{\mathrm{rel}}|}$$

- **Meaning:** Static friction adjusts up to a limiting value, while kinetic friction points opposite to the relative velocity.
- **Conditions:** This is the empirical Coulomb–Amontons model for dry surfaces; the coefficients depend on the pair of materials and the condition of their surfaces.
- **Units:** F and N: N; μ_s and μ_k: dimensionless
- **Related cards:** [[03 · Dynamics and Newton's Laws/3.6 · Friction and Drag|3.6]]

## Work–Energy Theorem

$$W_{\mathrm{net}}=\int_{\mathbf r_1}^{\mathbf r_2}\mathbf F_{\mathrm{net}}\cdot d\mathbf r=\Delta K,\qquad K=\frac12mv^2$$

- **Meaning:** The work done by the net force equals the change in the body's kinetic energy.
- **Conditions:** The expression K = mv²/2 is valid for a point particle of constant mass at nonrelativistic speeds.
- **Units:** W and K: J; F: N; r: m
- **Related cards:** [[04 · Energy, Momentum, and Rotation/4.1 · Work and Power|4.1]], [[04 · Energy, Momentum, and Rotation/4.2 · Kinetic Energy and the Work–Energy Theorem|4.2]]

## Momentum Balance and Conservation

$$\frac{d\mathbf P}{dt}=\mathbf F_{\mathrm{ext}};\qquad\mathbf F_{\mathrm{ext}}=0\Rightarrow\mathbf P=\mathrm{const}$$

- **Meaning:** The total momentum of a system is conserved when the net external force is zero.
- **Conditions:** The system must be closed with respect to momentum; internal forces are counted in pairs and do not change the total momentum.
- **Units:** P: kg·m/s; F: N; t: s
- **Related cards:** [[04 · Energy, Momentum, and Rotation/4.5 · Momentum and Impulse|4.5]], [[04 · Energy, Momentum, and Rotation/4.6 · Collisions, the Center of Mass, and Rockets|4.6]]

## Angular Momentum Balance

$$\mathbf L=\mathbf r\times\mathbf p,\qquad\frac{d\mathbf L}{dt}=\boldsymbol\tau_{\mathrm{ext}}$$

- **Meaning:** External torque gives the rate of change of angular momentum about the chosen origin.
- **Conditions:** The origin is stationary in an inertial frame; when the external torque is zero, L is conserved.
- **Units:** L: kg·m²/s; τ: N·m; r: m; p: kg·m/s
- **Related cards:** [[04 · Energy, Momentum, and Rotation/4.7 · Rotational Kinematics and Dynamics|4.7]], [[04 · Energy, Momentum, and Rotation/4.8 · Torque and Angular Momentum|4.8]]

## Newton's Law of Universal Gravitation

$$\mathbf F_{1\leftarrow2}=G\frac{m_1m_2}{|\mathbf r_2-\mathbf r_1|^3}(\mathbf r_2-\mathbf r_1)$$

- **Meaning:** Two point masses attract each other with a force that decreases with the square of the distance between them.
- **Conditions:** The bodies are pointlike or spherically symmetric and do not overlap; this is the force on mass 1 due to mass 2; the field is Newtonian and weak.
- **Units:** F: N; G: m³/(kg·s²); m: kg; r: m
- **Related cards:** [[05 · Gravitation and Celestial Mechanics/5.1 · Gravitational Field and Potential|5.1]]

## Kepler's Third Law for the Two-Body Problem

$$T^2=\frac{4\pi^2a^3}{G(M+m)}$$

- **Meaning:** Relates the period of an elliptical orbit to its semimajor axis and the sum of the bodies' masses.
- **Conditions:** An isolated Newtonian two-body system of pointlike or spherically symmetric bodies; perturbations and relativistic corrections are small.
- **Units:** T: s; a: m; M and m: kg; G: m³/(kg·s²)
- **Related cards:** [[05 · Gravitation and Celestial Mechanics/5.2 · Kepler's Laws and Orbits|5.2]], [[05 · Gravitation and Celestial Mechanics/5.3 · Orbital Energy and Cosmic Velocities|5.3]]

## Hooke's Law for Uniaxial Deformation

$$\sigma=E\varepsilon,\qquad\varepsilon=\frac{\Delta L}{L_0}$$

- **Meaning:** In the linear elastic regime, mechanical stress is proportional to strain.
- **Conditions:** Small uniaxial deformation of a homogeneous material below its proportional limit; the material returns to its original shape after unloading.
- **Units:** σ and E: Pa; ε: dimensionless; L: m
- **Related cards:** [[06 · Matter, Elasticity, and Fluids/6.2 · Deformation and Strength of Materials|6.2]]

## Bernoulli's Equation

$$p+\frac12\rho v^2+\rho gz=\mathrm{const}$$

- **Meaning:** Expresses conservation of mechanical energy per unit volume in a flowing fluid.
- **Conditions:** Steady flow of an incompressible, inviscid fluid along a streamline; the same constant applies throughout the flow only when the flow is irrotational.
- **Units:** each term: Pa = J/m³; ρ: kg/m³; v: m/s; z: m
- **Related cards:** [[06 · Matter, Elasticity, and Fluids/6.3 · Hydrostatics and Buoyancy|6.3]], [[06 · Matter, Elasticity, and Fluids/6.5 · Flow of Real Fluids|6.5]]

## Harmonic Oscillator

$$m\ddot x+kx=0,\qquad\omega_0=\sqrt{\frac{k}{m}},\qquad x=A\cos(\omega_0t+\varphi)$$

- **Meaning:** A linear restoring force produces sinusoidal oscillations at the natural frequency.
- **Conditions:** There is no damping or external driving; the force is linear in displacement, and the parameters m and k are constant.
- **Units:** m: kg; k: N/m; x and A: m; ω₀: rad/s; φ: dimensionless
- **Related cards:** [[07 · Oscillations, Waves, and Sound/7.1 · The Harmonic Oscillator|7.1]], [[07 · Oscillations, Waves, and Sound/7.2 · Energy and Phase Space|7.2]]

## Natural Frequencies of a Stretched String

$$f_n=\frac{n}{2L}\sqrt{\frac{T}{\mu}},\qquad n=1,2,3,\ldots$$

- **Meaning:** The boundary conditions select a discrete set of standing-wave frequencies on the string.
- **Conditions:** A uniform, flexible string with fixed ends, constant tension, and small transverse oscillations.
- **Units:** f: Hz; L: m; T: N; μ: kg/m
- **Related cards:** [[07 · Oscillations, Waves, and Sound/7.4 · How Waves Propagate|7.4]], [[07 · Oscillations, Waves, and Sound/7.5 · Superposition and Standing Waves|7.5]], [[07 · Oscillations, Waves, and Sound/7.7 · Sound and Acoustics|7.7]]

## Ideal-Gas Equation of State

$$pV=nRT=Nk_{\mathrm B}T$$

- **Meaning:** Relates the pressure, volume, particle count, and absolute temperature of a dilute gas.
- **Conditions:** The gas is close to ideal: interactions between particles and their own volume can be neglected, and the system is in equilibrium.
- **Units:** p: Pa; V: m³; n: mol; T: K; R: J/(mol·K); k_B: J/K; N: dimensionless
- **Related cards:** [[08 · Molecular and Statistical Physics, Thermodynamics/8.1 · The Molecular Picture and Temperature|8.1]], [[08 · Molecular and Statistical Physics, Thermodynamics/8.2 · Kinetic Theory of an Ideal Gas|8.2]]

## First Law of Thermodynamics

$$\Delta U=Q-W,\qquad W=\int_{V_1}^{V_2}p_{\mathrm{ext}}\,dV$$

- **Meaning:** The change in internal energy equals the heat supplied to the system minus the work done by the system.
- **Conditions:** A closed system; the convention W > 0 is used for work done by the system on its surroundings; the integral describes volume work in terms of the external pressure.
- **Units:** U, Q, and W: J; p: Pa; V: m³
- **Related cards:** [[08 · Molecular and Statistical Physics, Thermodynamics/8.4 · Internal Energy and the First Law|8.4]], [[08 · Molecular and Statistical Physics, Thermodynamics/8.6 · Thermodynamic Processes|8.6]]

## Entropy Change and the Second Law

$$\Delta S=\int_1^2\frac{\delta Q_{\mathrm{rev}}}{T},\qquad\Delta S_{\mathrm{univ}}\geq0$$

- **Meaning:** A change in the entropy of a state is calculated along a reversible path, while the total entropy of an isolated system and its surroundings cannot decrease.
- **Conditions:** The initial and final states are equilibrium states; the integral uses a hypothetical reversible path, which need not be the actual process.
- **Units:** S: J/K; Q: J; T: K
- **Related cards:** [[08 · Molecular and Statistical Physics, Thermodynamics/8.7 · Entropy and the Second Law|8.7]], [[08 · Molecular and Statistical Physics, Thermodynamics/8.8 · Heat Engines, Refrigerators, and Free Energy|8.8]]

## Coulomb's Law

$$\mathbf F_{2\leftarrow1}=\frac{1}{4\pi\varepsilon_0}\frac{q_1q_2}{|\mathbf r_2-\mathbf r_1|^3}(\mathbf r_2-\mathbf r_1)$$

- **Meaning:** Describes the electrostatic force on point charge 2 due to point charge 1 in a vacuum.
- **Conditions:** The charges are at rest and their dimensions are small compared with their separation; r₂ − r₁ points from charge 1 to charge 2; the surrounding medium is a vacuum.
- **Units:** F: N; q: C; r: m; ε₀: F/m
- **Related cards:** [[09 · Electricity, Circuits, and Signals/9.1 · Electric Charge and Matter|9.1]], [[09 · Electricity, Circuits, and Signals/9.2 · Coulomb's Law and the Electric Field|9.2]]

## Ohm's Law and the Resistance of a Conductor

$$V=IR,\qquad R=\rho\frac{\ell}{A}$$

- **Meaning:** The voltage across an ohmic element is proportional to the current, while the resistance of a uniform conductor is determined by its geometry and material.
- **Conditions:** A linear ohmic regime with constant temperature and resistivity; the conductor is uniform and has a constant cross-sectional area.
- **Units:** V: V; I: A; R: Ω; ρ: Ω·m; ℓ: m; A: m²
- **Related cards:** [[09 · Electricity, Circuits, and Signals/9.6 · Current, Resistance, and the Microscopic Picture|9.6]], [[09 · Electricity, Circuits, and Signals/9.8 · Electric Circuits and Measuring Instruments|9.8]]

## Capacitance and Capacitor Energy

$$C=\frac{Q}{V},\qquad U_C=\frac{Q^2}{2C}=\frac12CV^2$$

- **Meaning:** Capacitance relates charge to voltage, while the stored energy depends quadratically on either charge or voltage.
- **Conditions:** A linear capacitor of constant capacitance is charged quasistatically; losses and fringing effects are neglected.
- **Units:** C: F; Q: C; V: V; U_C: J
- **Related cards:** [[09 · Electricity, Circuits, and Signals/9.5 · Conductors, Dielectrics, and Capacitors|9.5]], [[09 · Electricity, Circuits, and Signals/9.9 · RC Circuits, Filters, and Signals|9.9]]

## Lorentz Force

$$\mathbf F=q(\mathbf E+\mathbf v\times\mathbf B)=\frac{d\mathbf p}{dt}$$

- **Meaning:** Electric and magnetic fields determine the change in momentum of a charged particle.
- **Conditions:** A point particle of charge q in prescribed classical fields; at relativistic speeds, p is the relativistic momentum.
- **Units:** F: N; q: C; E: V/m; v: m/s; B: T; p: kg·m/s
- **Related cards:** [[10 · Magnetism and Electrodynamics/10.1 · The Magnetic Field and the Lorentz Force|10.1]], [[10 · Magnetism and Electrodynamics/10.2 · Motion of a Charge in a Magnetic Field|10.2]]

## Faraday's Law of Electromagnetic Induction

$$\mathcal E=\oint_C\mathbf E\cdot d\mathbf l=-\frac{d\Phi_B}{dt},\qquad\Phi_B=\int_S\mathbf B\cdot d\mathbf S$$

- **Meaning:** A changing magnetic flux produces a nonconservative electric field and an electromotive force.
- **Conditions:** The loop C is stationary; the orientations of C and S are related by the right-hand rule; for a moving loop, the v × B contribution must be included.
- **Units:** ℰ: V; E: V/m; Φ_B: Wb; B: T; S: m²
- **Related cards:** [[10 · Magnetism and Electrodynamics/10.5 · Electromagnetic Induction|10.5]], [[10 · Magnetism and Electrodynamics/10.6 · Inductance, Alternating Current, and the RLC Circuit|10.6]]

## Speed of an Electromagnetic Wave in Vacuum

$$c=\frac{1}{\sqrt{\mu_0\varepsilon_0}}$$

- **Meaning:** Maxwell's equations relate the speed of light to the electric and magnetic properties of vacuum.
- **Conditions:** Linear electrodynamics in vacuum; in a material medium, the wave speed depends on the medium's dispersive properties.
- **Units:** c: m/s; μ₀: N/A²; ε₀: F/m
- **Related cards:** [[10 · Magnetism and Electrodynamics/10.7 · Maxwell's Equations and Electromagnetic Waves|10.7]]

## Snell's Law of Refraction

$$n_1\sin\theta_1=n_2\sin\theta_2,\qquad n=\frac{c}{v_{\mathrm{ph}}}$$

- **Meaning:** Determines how the direction of a light ray changes at the boundary between two media.
- **Conditions:** Homogeneous, isotropic media, a planar interface, and the geometric-optics approximation; both refractive indices are evaluated at the same frequency.
- **Units:** n: dimensionless; θ: rad; c and v_phase: m/s
- **Related cards:** [[11 · Light and Optics/11.1 · The Ray Model, Reflection, and Fermat's Principle|11.1]], [[11 · Light and Optics/11.2 · Refraction, Dispersion, and Total Internal Reflection|11.2]]

## Thin-Lens Equation

$$\frac1f=\frac1{d_o}+\frac1{d_i},\qquad M=-\frac{d_i}{d_o}$$

- **Meaning:** Relates focal length to object and image positions and gives the transverse magnification.
- **Conditions:** A thin lens, paraxial rays, and a consistent sign convention for real and virtual distances.
- **Units:** f, d_o, and d_i: m; M: dimensionless
- **Related cards:** [[11 · Light and Optics/11.3 · Mirrors and Lenses|11.3]], [[11 · Light and Optics/11.4 · The Eye, Camera, Microscope, and Telescope|11.4]]

## Double-Slit Interference Maxima

$$d\sin\theta_m=m\lambda,\qquad m=0,\pm1,\pm2,\ldots$$

- **Meaning:** A path difference equal to an integer number of wavelengths determines the directions of the interference maxima.
- **Conditions:** Coherent monochromatic light, identical slits, and the far-field regime; the diffraction envelope of each slit is treated separately.
- **Units:** d and λ: m; θ: rad; m: dimensionless
- **Related cards:** [[11 · Light and Optics/11.5 · Interference, Diffraction, and the Resolution Limit|11.5]], [[11 · Light and Optics/11.6 · Polarization, Color, and Spectroscopy|11.6]]

## Lorentz Factor and Time Dilation

$$\gamma=\frac{1}{\sqrt{1-v^2/c^2}},\qquad\Delta t=\gamma\,\Delta\tau$$

- **Meaning:** Between the same two events, a moving clock records less elapsed time than clocks in the laboratory frame.
- **Conditions:** Inertial frames with a constant relative speed |v| < c; Δτ is the time between events in the frame where they occur at the same location.
- **Units:** γ: dimensionless; v and c: m/s; Δt and Δτ: s
- **Related cards:** [[12 · Spacetime and Relativity/12.2 · Simultaneity and Light Clocks|12.2]], [[12 · Spacetime and Relativity/12.3 · Length Contraction and Lorentz Transformations|12.3]]

## Relativistic Energy–Momentum Relation

$$E^2=p^2c^2+m^2c^4$$

- **Meaning:** The total energy of a free particle is related to its momentum and invariant mass.
- **Conditions:** A free particle in special relativity; E includes the rest energy mc².
- **Units:** E and mc²: J; p: kg·m/s; m: kg; c: m/s
- **Related cards:** [[12 · Spacetime and Relativity/12.4 · Spacetime Diagrams and Causality|12.4]], [[12 · Spacetime and Relativity/12.5 · Relativistic Energy and Momentum|12.5]]

## Planck and de Broglie Relations

$$E_\gamma=h\nu,\qquad p=\frac{h}{\lambda}$$

- **Meaning:** Frequency determines a photon's energy, while wavelength determines the momentum of a quantum or a free particle.
- **Conditions:** E = hν applies to a photon; λ = h/p is the de Broglie wavelength of a quasi-monochromatic free state.
- **Units:** E: J; h: J·s; ν: Hz; p: kg·m/s; λ: m
- **Related cards:** [[13 · Quantum Physics, Atomic Physics, and Materials Physics/13.1 · The Crisis of Classical Physics and the Photon|13.1]], [[13 · Quantum Physics, Atomic Physics, and Materials Physics/13.2 · Matter Waves and the Double-Slit Experiment|13.2]]

## Heisenberg Uncertainty Relation

$$\sigma_x\sigma_p\geq\frac{\hbar}{2}$$

- **Meaning:** A quantum state cannot simultaneously have arbitrarily small spreads in position and its conjugate momentum.
- **Conditions:** σ_x and σ_p are the standard deviations of measurement outcomes for the same normalized quantum state.
- **Units:** σ_x: m; σ_p: kg·m/s; product: J·s
- **Related cards:** [[13 · Quantum Physics, Atomic Physics, and Materials Physics/13.3 · Quantum State and Measurement|13.3]], [[13 · Quantum Physics, Atomic Physics, and Materials Physics/13.4 · Uncertainty and the Schrödinger Equation|13.4]]

## Time-Dependent Schrödinger Equation

$$i\hbar\frac{\partial\psi}{\partial t}=\left[-\frac{\hbar^2}{2m}\nabla^2+V(\mathbf r,t)\right]\psi$$

- **Meaning:** It governs the unitary evolution of the wavefunction of a nonrelativistic particle.
- **Conditions:** A nonrelativistic spinless particle of constant mass in a scalar potential; ψ must satisfy the boundary conditions and normalization.
- **Units:** both sides: J·ψ; ħ: J·s; m: kg; V: J; r: m; t: s
- **Related cards:** [[13 · Quantum Physics, Atomic Physics, and Materials Physics/13.3 · Quantum State and Measurement|13.3]], [[13 · Quantum Physics, Atomic Physics, and Materials Physics/13.4 · Uncertainty and the Schrödinger Equation|13.4]]

## Law of Radioactive Decay

$$N(t)=N_0e^{-\lambda t},\qquad A=\lambda N,\qquad T_{1/2}=\frac{\ln2}{\lambda}$$

- **Meaning:** The number of undecayed nuclei and the activity decrease exponentially when the decay probability is constant.
- **Conditions:** The nuclei decay independently with a constant λ; the nuclide is neither produced nor subject to changes in its decay channel.
- **Units:** N: dimensionless; λ: s⁻¹; A: Bq = s⁻¹; T₁/₂ and t: s
- **Related cards:** [[14 · Nuclear Physics and Elementary Particle Physics/14.2 · Radioactivity and the Interaction of Radiation with Matter|14.2]]

## Nuclear Binding Energy

$$E_b=\left(Zm_p+Nm_n-m_{\mathrm{nucleus}}\right)c^2$$

- **Meaning:** The mass defect between the free nucleons and the nucleus corresponds to the energy required to separate the nucleus into its constituent nucleons.
- **Conditions:** Consistent ground-state nuclear masses must be used; when using atomic masses, electron masses and their binding energy must be accounted for consistently.
- **Units:** E_b: J; masses: kg; Z and N: dimensionless; c: m/s
- **Related cards:** [[14 · Nuclear Physics and Elementary Particle Physics/14.1 · The Atomic Nucleus and Binding Energy|14.1]], [[14 · Nuclear Physics and Elementary Particle Physics/14.3 · Nuclear Fission and Reactors|14.3]], [[14 · Nuclear Physics and Elementary Particle Physics/14.4 · Nuclear Fusion|14.4]]

## Hubble–Lemaître Law

$$v_{\mathrm{rec}}\approx H_0d$$

- **Meaning:** At low cosmological redshifts, a galaxy's recession speed is approximately proportional to its distance.
- **Conditions:** A homogeneously expanding Universe and a sufficiently small redshift; the peculiar velocity must be small compared with H₀d.
- **Units:** v: m/s; H₀: s⁻¹; d: m
- **Related cards:** [[15 · Astrophysics and Cosmology/15.1 · How We Measure the Universe|15.1]], [[15 · Astrophysics and Cosmology/15.7 · The Expanding Universe|15.7]]

## Hydrostatic Equilibrium of a Star

$$\frac{dP}{dr}=-\frac{G M(r)\rho(r)}{r^2},\qquad\frac{dM}{dr}=4\pi r^2\rho(r)$$

- **Meaning:** The pressure gradient supports a spherical star against contraction under its own gravity.
- **Conditions:** Spherical symmetry, quasistatic Newtonian equilibrium, and negligible rotation; relativistic corrections are required for compact objects.
- **Units:** P: Pa; r: m; M: kg; ρ: kg/m³; G: m³/(kg·s²)
- **Related cards:** [[15 · Astrophysics and Cosmology/15.2 · A Star's Equilibrium and Energy|15.2]], [[15 · Astrophysics and Cosmology/15.3 · Stellar Evolution and the Origin of the Elements|15.3]], [[15 · Astrophysics and Cosmology/15.4 · Compact Objects|15.4]]

## Logistic Map

$$x_{n+1}=r x_n(1-x_n)$$

- **Meaning:** This simple nonlinear map exhibits stable points, bifurcations, and chaos as the parameter r changes.
- **Conditions:** A dimensionless discrete model; to keep x_n in [0, 1], one usually takes x₀ in [0, 1] and 0 ≤ r ≤ 4.
- **Units:** x and r: dimensionless
- **Related cards:** [[16 · Nonlinearity, Chaos, and the Capstone Laboratory/16.1 · Nonlinearity and Feedback|16.1]], [[16 · Nonlinearity, Chaos, and the Capstone Laboratory/16.2 · Phase Portraits, Attractors, and Bifurcations|16.2]], [[16 · Nonlinearity, Chaos, and the Capstone Laboratory/16.3 · Deterministic Chaos|16.3]]

## Lyapunov Exponent of a One-Dimensional Map

$$\lambda_L=\lim_{N\to\infty}\frac1N\sum_{n=0}^{N-1}\ln|f'(x_n)|$$

- **Meaning:** A positive exponent indicates exponential divergence of nearby trajectories and sensitivity to initial conditions.
- **Conditions:** A differentiable one-dimensional map and a typical, sufficiently long trajectory; when physical time is used, the result is divided by the duration of one time step.
- **Units:** dimensionless (per iteration)
- **Related cards:** [[16 · Nonlinearity, Chaos, and the Capstone Laboratory/16.2 · Phase Portraits, Attractors, and Bifurcations|16.2]], [[16 · Nonlinearity, Chaos, and the Capstone Laboratory/16.3 · Deterministic Chaos|16.3]]
