// Сгенерировано scripts/build-content.mjs. Не редактировать вручную.
import type { FormulaEntry } from '../types';

export const formulas: FormulaEntry[] = [
  {
    "id": "normalized-residual",
    "chapter": 0,
    "title": "Normalized Model Residual",
    "latex": "z=\\frac{x_{\\mathrm{obs}}-x_{\\mathrm{model}}}{\\sqrt{\\sigma_{\\mathrm{obs}}^2+\\sigma_{\\mathrm{model}}^2}}",
    "plain": "z = (x_obs − x_model) / sqrt(σ_obs² + σ_model²)",
    "meaning": "Shows how many combined standard uncertainties separate an observation from the model's prediction.",
    "conditions": "The uncertainties must be standard, independent, and approximately normally distributed; covariance is required when they are correlated.",
    "units": "z: dimensionless; x and σ: the same SI units",
    "relatedTopics": [
      "0.1",
      "0.2"
    ]
  },
  {
    "id": "uncertainty-propagation",
    "chapter": 1,
    "title": "Propagation of Independent Uncertainties",
    "latex": "\\sigma_f^2\\approx\\sum_i\\left(\\frac{\\partial f}{\\partial x_i}\\right)^2\\sigma_{x_i}^2",
    "plain": "σ_f² ≈ Σ_i (∂f/∂x_i)² σ_xi²",
    "meaning": "Estimates the standard uncertainty of a calculated quantity from the uncertainties of the input data.",
    "conditions": "Linearization is valid for small uncertainties; the input quantities are uncorrelated, otherwise covariance terms must be added.",
    "units": "σ_f: the SI unit of f; each term in the sum: the square of the unit of f",
    "relatedTopics": [
      "1.2",
      "1.3"
    ]
  },
  {
    "id": "vector-dot-product",
    "chapter": 1,
    "title": "Dot Product of Vectors",
    "latex": "\\mathbf a\\cdot\\mathbf b=|\\mathbf a|\\,|\\mathbf b|\\cos\\theta=\\sum_i a_i b_i",
    "plain": "a · b = |a||b| cos θ = Σ_i a_i b_i",
    "meaning": "Relates the geometric angle between vectors to their components and isolates the longitudinal component.",
    "conditions": "The component-sum form is written in an orthonormal Euclidean basis.",
    "units": "the product of the SI units of quantities a and b",
    "relatedTopics": [
      "1.5",
      "1.6"
    ]
  },
  {
    "id": "velocity-acceleration",
    "chapter": 2,
    "title": "Instantaneous Velocity and Acceleration",
    "latex": "\\mathbf v=\\frac{d\\mathbf r}{dt},\\qquad\\mathbf a=\\frac{d\\mathbf v}{dt}=\\frac{d^2\\mathbf r}{dt^2}",
    "plain": "v = dr/dt; a = dv/dt = d²r/dt²",
    "meaning": "Velocity gives the rate of change of position, while acceleration gives the rate of change of velocity.",
    "conditions": "The trajectory must be differentiable with respect to time in the chosen frame of reference.",
    "units": "r: m; v: m/s; a: m/s²",
    "relatedTopics": [
      "2.3",
      "2.4"
    ]
  },
  {
    "id": "constant-acceleration-motion",
    "chapter": 2,
    "title": "Motion with Constant Acceleration",
    "latex": "\\mathbf v(t)=\\mathbf v_0+\\mathbf a t,\\qquad\\mathbf r(t)=\\mathbf r_0+\\mathbf v_0t+\\frac12\\mathbf a t^2",
    "plain": "v(t) = v₀ + at; r(t) = r₀ + v₀t + at²/2",
    "meaning": "Gives a body's velocity and position as functions of time when its acceleration remains constant.",
    "conditions": "Acceleration is constant in both magnitude and direction throughout the interval considered; time is measured from the initial state.",
    "units": "r: m; v: m/s; a: m/s²; t: s",
    "relatedTopics": [
      "2.4",
      "2.5"
    ]
  },
  {
    "id": "newton-second-law",
    "chapter": 3,
    "title": "Newton's Second Law",
    "latex": "\\sum\\mathbf F=\\frac{d\\mathbf p}{dt};\\qquad\\sum\\mathbf F=m\\mathbf a\\quad(m=\\mathrm{const})",
    "plain": "ΣF = dp/dt; for constant mass, ΣF = ma",
    "meaning": "The net external force determines the change in a body's momentum.",
    "conditions": "An inertial frame and a material system of fixed composition; the ma form additionally requires constant mass and nonrelativistic motion. For an open system such as a rocket, momentum flux must be included separately.",
    "units": "F: N; p: kg·m/s; m: kg; a: m/s²",
    "relatedTopics": [
      "3.1",
      "3.2",
      "3.3",
      "3.5",
      "3.7"
    ]
  },
  {
    "id": "dry-friction",
    "chapter": 3,
    "title": "Dry Friction",
    "latex": "|\\mathbf F_s|\\leq\\mu_s N,\\qquad\\mathbf F_k=-\\mu_kN\\frac{\\mathbf v_{\\mathrm{rel}}}{|\\mathbf v_{\\mathrm{rel}}|}",
    "plain": "|F_static| ≤ μ_s N; F_kinetic = −μ_k N · v_rel/|v_rel|",
    "meaning": "Static friction adjusts up to a limiting value, while kinetic friction points opposite to the relative velocity.",
    "conditions": "This is the empirical Coulomb–Amontons model for dry surfaces; the coefficients depend on the pair of materials and the condition of their surfaces.",
    "units": "F and N: N; μ_s and μ_k: dimensionless",
    "relatedTopics": [
      "3.6"
    ]
  },
  {
    "id": "work-energy-theorem",
    "chapter": 4,
    "title": "Work–Energy Theorem",
    "latex": "W_{\\mathrm{net}}=\\int_{\\mathbf r_1}^{\\mathbf r_2}\\mathbf F_{\\mathrm{net}}\\cdot d\\mathbf r=\\Delta K,\\qquad K=\\frac12mv^2",
    "plain": "W_net = ∫ F_net · dr = ΔK; K = mv²/2",
    "meaning": "The work done by the net force equals the change in the body's kinetic energy.",
    "conditions": "The expression K = mv²/2 is valid for a point particle of constant mass at nonrelativistic speeds.",
    "units": "W and K: J; F: N; r: m",
    "relatedTopics": [
      "4.1",
      "4.2"
    ]
  },
  {
    "id": "rotational-kinetic-energy",
    "chapter": 4,
    "title": "Rigid-Body Kinetic Energy and Rolling",
    "latex": "K=\\frac12Mv_{\\mathrm{cm}}^2+\\frac12I_{\\mathrm{cm}}\\omega^2,\\qquad v_{\\mathrm{cm}}=\\omega R",
    "plain": "K = Mv_cm²/2 + I_cmω²/2; v_cm = ωR for rolling without slipping",
    "meaning": "Splits the kinetic energy of a rigid body in planar motion into translation of its center of mass and rotation about it; the no-slip condition relates the two speeds.",
    "conditions": "A perfectly rigid body undergoes planar motion, with a principal axis through its center of mass. The relation v_cm = ωR applies to a round body of radius R rolling without slipping on a stationary surface; conservation of mechanical energy separately requires no dissipative work.",
    "units": "K: J; M: kg; v_cm: m/s; I_cm: kg·m²; ω: rad/s; R: m",
    "relatedTopics": [
      "4.2",
      "4.7"
    ]
  },
  {
    "id": "momentum-conservation",
    "chapter": 4,
    "title": "Momentum Balance and Conservation",
    "latex": "\\frac{d\\mathbf P}{dt}=\\mathbf F_{\\mathrm{ext}};\\qquad\\mathbf F_{\\mathrm{ext}}=0\\Rightarrow\\mathbf P=\\mathrm{const}",
    "plain": "dP/dt = F_ext; if F_ext = 0, then P = const",
    "meaning": "The total momentum of a system is conserved when the net external force is zero.",
    "conditions": "The system must be closed with respect to momentum; internal forces are counted in pairs and do not change the total momentum.",
    "units": "P: kg·m/s; F: N; t: s",
    "relatedTopics": [
      "4.5",
      "4.6"
    ]
  },
  {
    "id": "angular-momentum-balance",
    "chapter": 4,
    "title": "Angular Momentum Balance",
    "latex": "\\mathbf L_{\\mathrm{point}}=\\mathbf r\\times\\mathbf p,\\qquad\\mathbf L_{\\mathrm{system}}=\\sum_i\\mathbf r_i\\times\\mathbf p_i,\\qquad\\frac{d\\mathbf L}{dt}=\\boldsymbol\\tau_{\\mathrm{ext}}",
    "plain": "L_point = r × p; L_system = Σ_i r_i × p_i; dL/dt = τ_ext",
    "meaning": "A system's angular momentum is the sum of its particles' contributions, and external torque gives the rate of change of that sum.",
    "conditions": "All r_i and torques are measured about the same origin, fixed in an inertial frame; when the external torque is zero, the system's total L is conserved.",
    "units": "L: kg·m²/s; τ: N·m; r: m; p: kg·m/s",
    "relatedTopics": [
      "4.7",
      "4.8"
    ]
  },
  {
    "id": "newton-gravitation",
    "chapter": 5,
    "title": "Newton's Law of Universal Gravitation",
    "latex": "\\mathbf F_{1\\leftarrow2}=G\\frac{m_1m_2}{|\\mathbf r_2-\\mathbf r_1|^3}(\\mathbf r_2-\\mathbf r_1)",
    "plain": "F₁←₂ = G m₁m₂ (r₂ − r₁) / |r₂ − r₁|³",
    "meaning": "Two point masses attract each other with a force that decreases with the square of the distance between them.",
    "conditions": "The bodies are pointlike or spherically symmetric and do not overlap; this is the force on mass 1 due to mass 2; the field is Newtonian and weak.",
    "units": "F: N; G: m³/(kg·s²); m: kg; r: m",
    "relatedTopics": [
      "5.1"
    ]
  },
  {
    "id": "kepler-third-law",
    "chapter": 5,
    "title": "Kepler's Third Law for the Two-Body Problem",
    "latex": "T^2=\\frac{4\\pi^2a^3}{G(M+m)}",
    "plain": "T² = 4π²a³ / [G(M + m)]",
    "meaning": "Relates the period of an elliptical relative orbit to its semimajor axis and the sum of the bodies' masses.",
    "conditions": "An isolated Newtonian two-body system of pointlike or spherically symmetric bodies; a is the semimajor axis of one body's orbit relative to the other; perturbations and relativistic corrections are small.",
    "units": "T: s; a: m; M and m: kg; G: m³/(kg·s²)",
    "relatedTopics": [
      "5.2",
      "5.3"
    ]
  },
  {
    "id": "vis-viva-orbital-energy",
    "chapter": 5,
    "title": "Orbital Energy and the Vis-Viva Equation",
    "latex": "\\varepsilon=\\frac{v^2}{2}-\\frac{\\mu}{r}=-\\frac{\\mu}{2a},\\qquad v^2=\\mu\\left(\\frac{2}{r}-\\frac{1}{a}\\right),\\qquad\\mu=G(M+m)",
    "plain": "ε = v²/2 − μ/r = −μ/(2a); v² = μ(2/r − 1/a); μ = G(M + m)",
    "meaning": "Relates specific relative-motion energy, speed, and position on a Keplerian orbit to the semimajor axis of its conic section.",
    "conditions": "An isolated Newtonian two-body system of pointlike or nonoverlapping spherically symmetric bodies; r and v are relative separation and speed, and ε is energy per unit reduced mass. For an ellipse a > 0, for a parabola a tends to infinity, and for a hyperbola the convention a < 0 is used; drag, perturbations, and relativistic corrections are small.",
    "units": "ε: J/kg = m²/s²; v: m/s; μ: m³/s²; r and a: m; M and m: kg",
    "relatedTopics": [
      "5.2",
      "5.3"
    ]
  },
  {
    "id": "linear-elasticity",
    "chapter": 6,
    "title": "Hooke's Law for Uniaxial Deformation",
    "latex": "\\sigma=E\\varepsilon,\\qquad\\varepsilon=\\frac{\\Delta L}{L_0}",
    "plain": "σ = Eε; ε = ΔL/L₀",
    "meaning": "In the linear elastic regime, mechanical stress is proportional to strain.",
    "conditions": "Small uniaxial deformation of a homogeneous material below its proportional limit; the material returns to its original shape after unloading.",
    "units": "σ and E: Pa; ε: dimensionless; L: m",
    "relatedTopics": [
      "6.2"
    ]
  },
  {
    "id": "bernoulli-equation",
    "chapter": 6,
    "title": "Bernoulli's Equation",
    "latex": "p+\\frac12\\rho v^2+\\rho gz=\\mathrm{const}",
    "plain": "p + ρv²/2 + ρgz = const",
    "meaning": "Expresses conservation of mechanical energy per unit volume in a flowing fluid.",
    "conditions": "Steady flow of an incompressible, inviscid fluid along a streamline; the same constant applies throughout the flow only when the flow is irrotational.",
    "units": "each term: Pa = J/m³; ρ: kg/m³; v: m/s; z: m",
    "relatedTopics": [
      "6.3",
      "6.5"
    ]
  },
  {
    "id": "simple-pendulum-small-angle",
    "chapter": 7,
    "title": "Small-Angle Period of a Simple Pendulum",
    "latex": "T=2\\pi\\sqrt{\\frac{L}{g}},\\qquad\\omega_0=\\sqrt{\\frac{g}{L}}",
    "plain": "T = 2π sqrt(L/g); ω₀ = sqrt(g/L)",
    "meaning": "Gives the period and natural angular frequency of small oscillations of an ideal simple pendulum.",
    "conditions": "The bob is a point particle, and the string of length L is massless, inextensible, and attached to a frictionless pivot; g is uniform, drag is absent, and amplitude |θ₀| is small enough in radians that sin θ ≈ θ. Amplitude independence of the period holds only to this approximation.",
    "units": "T: s; L: m; g: m/s²; ω₀: rad/s; θ₀: rad (dimensionless)",
    "relatedTopics": [
      "0.1",
      "7.1"
    ]
  },
  {
    "id": "harmonic-oscillator",
    "chapter": 7,
    "title": "Harmonic Oscillator",
    "latex": "m\\ddot x+kx=0,\\qquad\\omega_0=\\sqrt{\\frac{k}{m}},\\qquad x=A\\cos(\\omega_0t+\\varphi)",
    "plain": "m ẍ + kx = 0; ω₀ = sqrt(k/m); x = A cos(ω₀t + φ)",
    "meaning": "A linear restoring force produces sinusoidal oscillations at the natural frequency.",
    "conditions": "There is no damping or external driving; the force is linear in displacement, and the parameters m and k are constant.",
    "units": "m: kg; k: N/m; x and A: m; ω₀: rad/s; φ: dimensionless",
    "relatedTopics": [
      "0.2",
      "7.1",
      "7.2"
    ]
  },
  {
    "id": "wave-speed",
    "chapter": 7,
    "title": "Wave Speed, Frequency, and Wavelength",
    "latex": "v_{\\mathrm{ph}}=f\\lambda",
    "plain": "v_phase = fλ",
    "meaning": "During one period, the profile of a harmonic wave advances by one wavelength.",
    "conditions": "A monochromatic traveling wave, with f and λ measured in the same reference frame. In a dispersive medium this is the phase velocity at that frequency, not necessarily the energy-transport velocity.",
    "units": "v_phase: m/s; f: Hz; λ: m",
    "relatedTopics": [
      "7.4"
    ]
  },
  {
    "id": "standing-wave-string",
    "chapter": 7,
    "title": "Natural Frequencies of a Stretched String",
    "latex": "f_n=\\frac{n}{2L}\\sqrt{\\frac{T}{\\mu}},\\qquad n=1,2,3,\\ldots",
    "plain": "f_n = n/(2L) · sqrt(T/μ), n = 1, 2, 3, …",
    "meaning": "The boundary conditions select a discrete set of standing-wave frequencies on the string.",
    "conditions": "A uniform, flexible string with fixed ends, constant tension, and small transverse oscillations.",
    "units": "f: Hz; L: m; T: N; μ: kg/m",
    "relatedTopics": [
      "7.5",
      "7.7"
    ]
  },
  {
    "id": "ideal-gas-law",
    "chapter": 8,
    "title": "Ideal-Gas Equation of State",
    "latex": "pV=nRT=Nk_{\\mathrm B}T",
    "plain": "pV = nRT = Nk_B T",
    "meaning": "Relates the pressure, volume, particle count, and absolute temperature of a dilute gas.",
    "conditions": "The gas is close to ideal: interactions between particles and their own volume can be neglected, and the system is in equilibrium.",
    "units": "p: Pa; V: m³; n: mol; T: K; R: J/(mol·K); k_B: J/K; N: dimensionless",
    "relatedTopics": [
      "8.1",
      "8.2"
    ]
  },
  {
    "id": "first-law-thermodynamics",
    "chapter": 8,
    "title": "First Law of Thermodynamics",
    "latex": "\\Delta U=Q-W_{\\mathrm{total}},\\qquad W_{pV}=\\int_{V_1}^{V_2}p_{\\mathrm{ext}}\\,dV",
    "plain": "ΔU = Q − W_total; W_pV = ∫ p_ext dV",
    "meaning": "The change in internal energy equals the heat supplied to the system minus the total work done by the system.",
    "conditions": "A closed system, with Q > 0 into the system and W > 0 for work done by the system. The integral gives boundary pV work only; it equals total work only when electrical, chemical, and other work channels are absent.",
    "units": "U, Q, W_total, and W_pV: J; p: Pa; V: m³",
    "relatedTopics": [
      "8.4",
      "8.6"
    ]
  },
  {
    "id": "boltzmann-entropy",
    "chapter": 8,
    "title": "Statistical Definition of Entropy",
    "latex": "S=k_{\\mathrm B}\\ln\\Omega;\\qquad S_{\\mathrm G}=-k_{\\mathrm B}\\sum_i p_i\\ln p_i",
    "plain": "S = k_B ln Ω; for a discrete classical ensemble S_G = −k_B Σ_i p_i ln p_i",
    "meaning": "Entropy depends logarithmically on the number of equiprobable microstates; the Gibbs entropy of a discrete classical ensemble accounts for the probability of each state.",
    "conditions": "The first form requires Ω accessible equiprobable microstates. In the second form the discrete probabilities p_i are normalized and a term with p_i = 0 is zero by continuity; continuous and quantum states require modified definitions.",
    "units": "S and k_B: J/K; Ω and p_i: dimensionless",
    "relatedTopics": [
      "8.7"
    ]
  },
  {
    "id": "entropy-balance",
    "chapter": 8,
    "title": "Entropy Change and the Second Law",
    "latex": "\\Delta S=\\int_1^2\\frac{\\delta Q_{\\mathrm{rev}}}{T},\\qquad\\Delta S_{\\mathrm{univ}}\\geq0",
    "plain": "ΔS = ∫ δQ_rev/T; ΔS_universe ≥ 0",
    "meaning": "A change in the entropy of a state is calculated along a reversible path, while the total entropy of an isolated system and its surroundings cannot decrease.",
    "conditions": "The initial and final states are equilibrium states; the integral uses a hypothetical reversible path, which need not be the actual process.",
    "units": "S: J/K; Q: J; T: K",
    "relatedTopics": [
      "8.7",
      "8.8"
    ]
  },
  {
    "id": "coulomb-law",
    "chapter": 9,
    "title": "Coulomb's Law",
    "latex": "\\mathbf F_{2\\leftarrow1}=\\frac{1}{4\\pi\\varepsilon_0}\\frac{q_1q_2}{|\\mathbf r_2-\\mathbf r_1|^3}(\\mathbf r_2-\\mathbf r_1)",
    "plain": "F₂←₁ = [1/(4πε₀)] q₁q₂ (r₂ − r₁)/|r₂ − r₁|³",
    "meaning": "Describes the electrostatic force on point charge 2 due to point charge 1 in a vacuum.",
    "conditions": "The charges are at rest and their dimensions are small compared with their separation; r₂ − r₁ points from charge 1 to charge 2; the surrounding medium is a vacuum.",
    "units": "F: N; q: C; r: m; ε₀: F/m",
    "relatedTopics": [
      "9.1",
      "9.2"
    ]
  },
  {
    "id": "ohm-law",
    "chapter": 9,
    "title": "Ohm's Law and the Resistance of a Conductor",
    "latex": "V=IR,\\qquad R=\\rho\\frac{\\ell}{A}",
    "plain": "V = IR; R = ρℓ/A",
    "meaning": "The voltage across an ohmic element is proportional to the current, while the resistance of a uniform conductor is determined by its geometry and material.",
    "conditions": "A linear ohmic regime with constant temperature and resistivity; the conductor is uniform and has a constant cross-sectional area.",
    "units": "V: V; I: A; R: Ω; ρ: Ω·m; ℓ: m; A: m²",
    "relatedTopics": [
      "9.6",
      "9.8"
    ]
  },
  {
    "id": "capacitor-energy",
    "chapter": 9,
    "title": "Capacitance and Capacitor Energy",
    "latex": "C=\\frac{Q}{V},\\qquad U_C=\\frac{Q^2}{2C}=\\frac12CV^2",
    "plain": "C = Q/V; U_C = Q²/(2C) = CV²/2",
    "meaning": "Capacitance relates charge to voltage, while the stored energy depends quadratically on either charge or voltage.",
    "conditions": "A linear capacitor of constant capacitance is charged quasistatically; losses and fringing effects are neglected.",
    "units": "C: F; Q: C; V: V; U_C: J",
    "relatedTopics": [
      "9.5",
      "9.9"
    ]
  },
  {
    "id": "lorentz-force",
    "chapter": 10,
    "title": "Lorentz Force",
    "latex": "\\mathbf F=q(\\mathbf E+\\mathbf v\\times\\mathbf B)=\\frac{d\\mathbf p}{dt}",
    "plain": "F = q(E + v × B) = dp/dt",
    "meaning": "Electric and magnetic fields determine the change in momentum of a charged particle.",
    "conditions": "A point particle of charge q in prescribed classical fields; at relativistic speeds, p is the relativistic momentum.",
    "units": "F: N; q: C; E: V/m; v: m/s; B: T; p: kg·m/s",
    "relatedTopics": [
      "10.1",
      "10.2"
    ]
  },
  {
    "id": "faraday-induction",
    "chapter": 10,
    "title": "Faraday's Law of Electromagnetic Induction",
    "latex": "\\mathcal E=\\oint_C\\mathbf E\\cdot d\\mathbf l=-\\frac{d\\Phi_B}{dt},\\qquad\\Phi_B=\\int_S\\mathbf B\\cdot d\\mathbf S",
    "plain": "ℰ = ∮ E · dl = −dΦ_B/dt; Φ_B = ∫ B · dS",
    "meaning": "A changing magnetic flux produces a nonconservative electric field and an electromotive force.",
    "conditions": "The loop C is stationary; the orientations of C and S are related by the right-hand rule; for a moving loop, the v × B contribution must be included.",
    "units": "ℰ: V; E: V/m; Φ_B: Wb; B: T; S: m²",
    "relatedTopics": [
      "10.5",
      "10.6"
    ]
  },
  {
    "id": "electromagnetic-wave-speed",
    "chapter": 10,
    "title": "Speed of an Electromagnetic Wave in Vacuum",
    "latex": "c=\\frac{1}{\\sqrt{\\mu_0\\varepsilon_0}}",
    "plain": "c = 1/sqrt(μ₀ε₀)",
    "meaning": "Maxwell's equations relate the speed of light to the electric and magnetic properties of vacuum.",
    "conditions": "Linear electrodynamics in vacuum; in a material medium, the wave speed depends on the medium's dispersive properties.",
    "units": "c: m/s; μ₀: N/A²; ε₀: F/m",
    "relatedTopics": [
      "10.7"
    ]
  },
  {
    "id": "snell-law",
    "chapter": 11,
    "title": "Snell's Law of Refraction",
    "latex": "n_1\\sin\\theta_1=n_2\\sin\\theta_2,\\qquad n=\\frac{c}{v_{\\mathrm{ph}}}",
    "plain": "n₁ sin θ₁ = n₂ sin θ₂; n = c/v_phase",
    "meaning": "Determines how the direction of a light ray changes at the boundary between two media.",
    "conditions": "Homogeneous, isotropic media, a planar interface, and the geometric-optics approximation; both refractive indices are evaluated at the same frequency.",
    "units": "n: dimensionless; θ: rad; c and v_phase: m/s",
    "relatedTopics": [
      "11.1",
      "11.2"
    ]
  },
  {
    "id": "thin-lens-equation",
    "chapter": 11,
    "title": "Thin-Lens Equation",
    "latex": "\\frac1f=\\frac1{d_o}+\\frac1{d_i},\\qquad M=-\\frac{d_i}{d_o}",
    "plain": "1/f = 1/d_o + 1/d_i; M = −d_i/d_o",
    "meaning": "Relates focal length to object and image positions and gives the transverse magnification.",
    "conditions": "A thin lens, paraxial rays, and a consistent sign convention for real and virtual distances.",
    "units": "f, d_o, and d_i: m; M: dimensionless",
    "relatedTopics": [
      "11.3",
      "11.4"
    ]
  },
  {
    "id": "double-slit-maxima",
    "chapter": 11,
    "title": "Double-Slit Interference Maxima",
    "latex": "d\\sin\\theta_m=m\\lambda,\\qquad m=0,\\pm1,\\pm2,\\ldots",
    "plain": "d sin θ_m = mλ, m = 0, ±1, ±2, …",
    "meaning": "A path difference equal to an integer number of wavelengths determines the directions of the interference maxima.",
    "conditions": "Coherent monochromatic light, identical slits, and the far-field regime; the diffraction envelope of each slit is treated separately.",
    "units": "d and λ: m; θ: rad; m: dimensionless",
    "relatedTopics": [
      "11.5",
      "11.6"
    ]
  },
  {
    "id": "lorentz-factor-time-dilation",
    "chapter": 12,
    "title": "Lorentz Factor and Time Dilation",
    "latex": "\\gamma=\\frac{1}{\\sqrt{1-v^2/c^2}},\\qquad\\Delta t=\\gamma\\,\\Delta\\tau",
    "plain": "γ = 1/sqrt(1 − v²/c²); Δt = γΔτ",
    "meaning": "Between the same two events, a moving clock records less elapsed time than clocks in the laboratory frame.",
    "conditions": "Inertial frames with a constant relative speed |v| < c; Δτ is the time between events in the frame where they occur at the same location.",
    "units": "γ: dimensionless; v and c: m/s; Δt and Δτ: s",
    "relatedTopics": [
      "12.2",
      "12.3"
    ]
  },
  {
    "id": "lorentz-transform-interval",
    "chapter": 12,
    "title": "Lorentz Transformation and Spacetime Interval",
    "latex": "\\beta=\\frac{v}{c},\\quad\\gamma=\\frac{1}{\\sqrt{1-\\beta^2}};\\qquad ct'=\\gamma(ct-\\beta x),\\quad x'=\\gamma(x-\\beta ct);\\qquad\\Delta s^2=c^2\\Delta t^2-\\lvert\\Delta\\mathbf r\\rvert^2",
    "plain": "β = v/c; γ = 1/√(1 − β²); ct′ = γ(ct − βx); x′ = γ(x − βct); Δs² = c²Δt² − |Δr|²",
    "meaning": "The transformation mixes position and time while preserving the spacetime interval and the causal type of a pair of events.",
    "conditions": "Inertial frames with parallel axes and relative velocity v along x; β = v/c, the origins coincide at t = t′ = 0, and the (+,−,−,−) metric convention is used.",
    "units": "ct, x, and |Δr|: m; Δs²: m²; β and γ: dimensionless; t: s",
    "relatedTopics": [
      "12.3",
      "12.4"
    ]
  },
  {
    "id": "relativistic-energy-momentum",
    "chapter": 12,
    "title": "Relativistic Energy–Momentum Relation",
    "latex": "E^2=p^2c^2+m^2c^4",
    "plain": "E² = p²c² + m²c⁴",
    "meaning": "The total energy of a free particle is related to its momentum and invariant mass.",
    "conditions": "A free particle in special relativity; E includes the rest energy mc².",
    "units": "E and mc²: J; p: kg·m/s; m: kg; c: m/s",
    "relatedTopics": [
      "12.5"
    ]
  },
  {
    "id": "photon-de-broglie-relations",
    "chapter": 13,
    "title": "Planck and de Broglie Relations",
    "latex": "E_\\gamma=h\\nu,\\qquad p=\\frac{h}{\\lambda}",
    "plain": "E_γ = hν; p = h/λ",
    "meaning": "Frequency determines a photon's energy, while wavelength determines the momentum of a quantum or a free particle.",
    "conditions": "E = hν applies to a photon; λ = h/p is the de Broglie wavelength of a quasi-monochromatic free state.",
    "units": "E: J; h: J·s; ν: Hz; p: kg·m/s; λ: m",
    "relatedTopics": [
      "13.1",
      "13.2"
    ]
  },
  {
    "id": "double-slit-probability",
    "chapter": 13,
    "title": "Relative Detection Density behind Two Narrow Slits",
    "latex": "\\rho(\\theta)\\propto\\cos^2\\!\\left(\\frac{\\pi d\\sin\\theta}{\\lambda}\\right)",
    "plain": "ρ(θ) ∝ cos²(πd sin θ / λ)",
    "meaning": "The squared sum of the amplitudes for two indistinguishable paths produces maxima and minima in the relative density of individual detection events.",
    "conditions": "Two identical coherent narrow slits in the far field; normalization of the density depends on the chosen angular or screen coordinate. Finite slit width adds a single-slit diffraction envelope, while available which-path information removes the interference term.",
    "units": "ρ: relative density in the chosen coordinate; d and λ: m; θ: rad",
    "relatedTopics": [
      "13.2"
    ]
  },
  {
    "id": "heisenberg-uncertainty",
    "chapter": 13,
    "title": "Heisenberg Uncertainty Relation",
    "latex": "\\sigma_x\\sigma_p\\geq\\frac{\\hbar}{2}",
    "plain": "σ_x σ_p ≥ ħ/2",
    "meaning": "A quantum state cannot simultaneously have arbitrarily small spreads in position and its conjugate momentum.",
    "conditions": "σ_x and σ_p are the standard deviations of measurement outcomes for the same normalized quantum state.",
    "units": "σ_x: m; σ_p: kg·m/s; product: J·s",
    "relatedTopics": [
      "13.3",
      "13.4"
    ]
  },
  {
    "id": "schrodinger-equation",
    "chapter": 13,
    "title": "Time-Dependent Schrödinger Equation",
    "latex": "i\\hbar\\frac{\\partial\\psi}{\\partial t}=\\left[-\\frac{\\hbar^2}{2m}\\nabla^2+V(\\mathbf r,t)\\right]\\psi",
    "plain": "iħ ∂ψ/∂t = [−ħ²∇²/(2m) + V(r,t)]ψ",
    "meaning": "It governs the unitary evolution of the wavefunction of a nonrelativistic particle.",
    "conditions": "A nonrelativistic spinless particle of constant mass in a scalar potential; ψ must satisfy the boundary conditions and normalization.",
    "units": "both sides: J·ψ; ħ: J·s; m: kg; V: J; r: m; t: s",
    "relatedTopics": [
      "13.3",
      "13.4"
    ]
  },
  {
    "id": "radioactive-decay",
    "chapter": 14,
    "title": "Law of Radioactive Decay",
    "latex": "N(t)=N_0e^{-\\lambda t},\\qquad A=\\lambda N,\\qquad T_{1/2}=\\frac{\\ln2}{\\lambda}",
    "plain": "N(t) = N₀e^(−λt); A = λN; T₁/₂ = ln 2 / λ",
    "meaning": "The number of undecayed nuclei and the activity decrease exponentially when the decay probability is constant.",
    "conditions": "The nuclei decay independently with a constant λ; the nuclide is neither produced nor subject to changes in its decay channel.",
    "units": "N: dimensionless; λ: s⁻¹; A: Bq = s⁻¹; T₁/₂ and t: s",
    "relatedTopics": [
      "14.2"
    ]
  },
  {
    "id": "nuclear-binding-energy",
    "chapter": 14,
    "title": "Nuclear Binding Energy",
    "latex": "E_b=\\left(Zm_p+Nm_n-m_{\\mathrm{nucleus}}\\right)c^2",
    "plain": "E_b = (Z m_p + N m_n − m_nucleus)c²",
    "meaning": "The mass defect between the free nucleons and the nucleus corresponds to the energy required to separate the nucleus into its constituent nucleons.",
    "conditions": "Consistent ground-state nuclear masses must be used; when using atomic masses, electron masses and their binding energy must be accounted for consistently.",
    "units": "E_b: J; masses: kg; Z and N: dimensionless; c: m/s",
    "relatedTopics": [
      "14.1",
      "14.3",
      "14.4"
    ]
  },
  {
    "id": "hubble-law",
    "chapter": 15,
    "title": "Hubble–Lemaître Law",
    "latex": "v_{\\mathrm{rec}}\\approx H_0d",
    "plain": "v_recession ≈ H₀d",
    "meaning": "At low cosmological redshifts, a galaxy's recession speed is approximately proportional to its distance.",
    "conditions": "A homogeneously expanding Universe and a sufficiently small redshift; the peculiar velocity must be small compared with H₀d.",
    "units": "v: m/s; H₀: s⁻¹; d: m",
    "relatedTopics": [
      "15.1",
      "15.7"
    ]
  },
  {
    "id": "stellar-hydrostatic-equilibrium",
    "chapter": 15,
    "title": "Hydrostatic Equilibrium of a Star",
    "latex": "\\frac{dP}{dr}=-\\frac{G M(r)\\rho(r)}{r^2},\\qquad\\frac{dM}{dr}=4\\pi r^2\\rho(r)",
    "plain": "dP/dr = −G M(r)ρ(r)/r²; dM/dr = 4πr²ρ(r)",
    "meaning": "The pressure gradient supports a spherical star against contraction under its own gravity.",
    "conditions": "Spherical symmetry, quasistatic Newtonian equilibrium, and negligible rotation; relativistic corrections are required for compact objects.",
    "units": "P: Pa; r: m; M: kg; ρ: kg/m³; G: m³/(kg·s²)",
    "relatedTopics": [
      "15.2",
      "15.3",
      "15.4"
    ]
  },
  {
    "id": "logistic-map",
    "chapter": 16,
    "title": "Logistic Map",
    "latex": "x_{n+1}=r x_n(1-x_n)",
    "plain": "x_(n+1) = r x_n(1 − x_n)",
    "meaning": "This simple nonlinear map exhibits stable points, bifurcations, and chaos as the parameter r changes.",
    "conditions": "A dimensionless discrete model; to keep x_n in [0, 1], one usually takes x₀ in [0, 1] and 0 ≤ r ≤ 4.",
    "units": "x and r: dimensionless",
    "relatedTopics": [
      "16.1",
      "16.2",
      "16.3"
    ]
  },
  {
    "id": "lyapunov-exponent-map",
    "chapter": 16,
    "title": "Lyapunov Exponent of a One-Dimensional Map",
    "latex": "\\lambda_L=\\lim_{N\\to\\infty}\\frac1N\\sum_{n=0}^{N-1}\\ln|f'(x_n)|",
    "plain": "λ_L = lim_(N→∞) (1/N) Σ_(n=0)^(N−1) ln|f′(x_n)|",
    "meaning": "A positive exponent indicates exponential divergence of nearby trajectories and sensitivity to initial conditions.",
    "conditions": "A differentiable one-dimensional map and a typical, sufficiently long trajectory; when physical time is used, the result is divided by the duration of one time step.",
    "units": "dimensionless (per iteration)",
    "relatedTopics": [
      "16.2",
      "16.3"
    ]
  }
];
