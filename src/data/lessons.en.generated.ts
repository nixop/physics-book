// Сгенерировано scripts/build-content.mjs. Не редактировать вручную.
import type { TopicLessonDetail } from '../types';

export const lessonDetails: Record<string, TopicLessonDetail> = {
  "0.1": {
    "topicId": "0.1",
    "question": "How can an observation of a real phenomenon become a model that makes testable predictions without mistaking the simplification for reality itself?",
    "overview": [
      "A physical investigation begins with a choice: which properties matter to the question and which can be neglected. Observation supplies the initial facts, idealization isolates what is essential, a model relates quantities, and an experiment tests the resulting prediction.",
      "One object can support several models. A flying ball may be a point particle when range is calculated, a rotating rigid body when spin matters, and a deformable shell during impact. A model is judged by the accuracy of its answer within a stated domain, not by the number of realistic details it contains."
    ],
    "conceptExplanations": [
      "These stages form a testable cycle: data motivate an idealization, the model produces a quantitative or qualitative prediction, and a new experiment can reject or refine that prediction.",
      "A useful description deliberately removes details that have little influence on the chosen outcome. A simple model can therefore answer a focused question more reliably than a complicated but poorly specified simulation.",
      "An approximation should be accompanied by a small parameter, such as the ratio of an object's size to its travel distance. Its domain states where omitted effects remain below the required accuracy.",
      "A measured fact belongs to a particular procedure and uncertainty; a hypothesis is a testable proposal; a model represents a system; a law expresses a persistent relation among quantities under stated conditions."
    ],
    "boundary": "A model must not be extrapolated beyond tested scales without a new error estimate: a point-particle model fails when size or rotation matters, and classical mechanics fails at relativistic speeds or quantum scales.",
    "example": {
      "title": "A model for a pendulum period",
      "problem": "Predict how the period of small oscillations changes when a pendulum length increases from 0.40 to 0.90 m. How should the model be built and tested?",
      "steps": [
        "Define the system: treat the bob as a point particle, the string as massless and inextensible, and neglect air drag.",
        "For small angles, adopt T = 2π√(L/g), with the same g in both measurement series.",
        "Predict the period ratio: T₂/T₁ = √(0.90/0.40) = 1.5.",
        "Measure the time for, say, ten oscillations at each length, repeat each series, and compare the ratio of mean periods with 1.5."
      ],
      "answer": "The model predicts a period 1.5 times as large. Agreement within uncertainty supports the model only for the tested lengths and small amplitudes.",
      "check": "The formula gives T → 0 as L → 0, but the point-bob and string models fail first; this limiting case shows why the equation is not universal."
    },
    "pitfall": "Agreement at one point does not prove a model true: several models may cross at that point and make different predictions when a parameter changes.",
    "practice": [
      {
        "question": "Is the statement 'the ball follows a parabola' an observation, a law, or a model claim?",
        "hint": "Ask which effects must be omitted to obtain an exact parabola.",
        "answer": "It is a model claim for motion in a uniform field with no air drag and negligible Earth curvature. An observed path can only support this model approximately."
      },
      {
        "question": "A model predicts y = ax². When x doubles, measured y rises from 3.0 to 11.8 units. Is the ratio broadly consistent with the model?",
        "hint": "For a quadratic relation, compare y₂/y₁ with 2².",
        "answer": "y₂/y₁ ≈ 11.8/3.0 ≈ 3.93, close to the predicted value 4. A rigorous conclusion still requires uncertainties and additional points."
      }
    ]
  },
  "0.2": {
    "topicId": "0.2",
    "question": "Which choices in an experimental design let us attribute a change in the result to the cause being investigated?",
    "overview": [
      "An experiment is not merely an observed outcome but a predefined procedure. The investigator sets the system boundary, chooses the factor to vary, defines the measured quantity, and either holds other important conditions fixed or accounts for them in the model.",
      "Reliable results depend on measurement series, traceable calibration, and a transparent protocol. Repeatability tests stability with the same setup, whereas reproducibility asks whether a compatible result is obtained with another method, operator, or laboratory."
    ],
    "conceptExplanations": [
      "The system boundary determines which exchanges are external. Inputs specify the experimental conditions, while every measured quantity needs an operational definition: the instrument and procedure used to obtain it.",
      "If another important factor changes together with the chosen input, their effects cannot be separated. Control means fixing, measuring, or independently varying such factors rather than merely assuming they are irrelevant.",
      "Repeatability exposes random scatter and drift within one setup. Reproducibility is a stronger challenge because it tests for hidden dependence on a particular instrument or analysis pipeline.",
      "One agreeing point may occur by chance or fit several different relations. A series spanning the parameter range can test the shape of the relation, its residuals, and systematic departures."
    ],
    "boundary": "A controlled laboratory conclusion applies to the selected objects, parameter range, and measurement procedure; changing material, scale, or environmental conditions requires a separate test.",
    "example": {
      "title": "Testing the mass dependence of a spring oscillator",
      "problem": "How can T = 2π√(m/k) be tested without confusing a mass effect with a changing amplitude?",
      "steps": [
        "Use the same spring and coordinate measurement, and set the same small initial amplitude for every mass.",
        "Choose several masses within the spring's elastic range and measure ten complete oscillations in repeated trials for each mass.",
        "Divide each series time by ten, estimate the mean period and spread, and plot T² against m.",
        "Check whether a straight line is consistent with the data and whether residuals show structure; its slope should be close to 4π²/k."
      ],
      "answer": "A linear T²(m) relation at controlled amplitude supports the square-root model. A nonzero intercept may reveal the spring's effective mass or a systematic timing delay.",
      "check": "The unit of the slope T²/m is s²/kg, the same as the unit of 1/k when k is in N/m = kg/s²."
    },
    "pitfall": "Repeating one reading many times is insufficient when an instrument is biased: repetition reduces estimated random scatter but does not remove a systematic effect.",
    "practice": [
      {
        "question": "While testing a wire's resistance against temperature, the wire also expands. What should the experimenter do?",
        "hint": "The second effect need not be eliminated completely; it can be measured or estimated.",
        "answer": "Control the geometry or include the changes in length and cross-sectional area in the model and uncertainty budget. Otherwise the observed change cannot be assigned solely to resistivity."
      },
      {
        "question": "The measured times for ten oscillations are 12.4, 12.6, and 12.5 s. Estimate the mean period of one oscillation.",
        "hint": "Average the series times first, then divide by the number of oscillations.",
        "answer": "The mean time for ten oscillations is 12.5 s, so the mean period is 1.25 s. A complete reported result would also include uncertainty and timer resolution."
      }
    ]
  },
  "0.3": {
    "topicId": "0.3",
    "question": "How should an interactive model be used so that moving a slider produces a physical conclusion rather than merely an animation?",
    "overview": [
      "An interactive becomes useful when it is treated as a small experiment. State the expected direction of change before running it, vary one parameter, read a numerical or graphical result, and explain that result through the model.",
      "An on-screen model does not replace a real apparatus: it executes its encoded equations and assumptions exactly. A notebook should therefore preserve not only values but also the question, fixed conditions, units, observation, explanation, and discovered limit of applicability."
    ],
    "conceptExplanations": [
      "A prediction made before running the model prevents the explanation from being fitted to what was seen. Measurement turns an impression into data, and the final explanation connects the effect's sign, scale, and shape to a physical cause.",
      "A slider usually controls an input, a graph displays a relation, and a virtual instrument reports an observable value. Before comparing runs, identify the ranges, units, axis scales, and quantities held fixed.",
      "A useful record contains a table of inputs and outputs, a snapshot of conditions or model version, and a short conclusion. This makes the result reproducible and keeps data separate from later interpretation.",
      "The intuitive layer asks for the direction of an effect, the core path relates quantities and graphs, and the mathematical layer derives the dependence and estimates its limits; all three can preserve the same guiding question."
    ],
    "boundary": "A simulation result verifies consequences of the implemented equations, not their agreement with nature; numerical parameters, boundary conditions, and omitted effects must be compared separately with a real experiment.",
    "example": {
      "title": "Investigating a relation without random trial and error",
      "problem": "A model says that period T depends on length L. How can five runs distinguish T ∝ L from T ∝ √L?",
      "steps": [
        "Write down both competing hypotheses and predict whether quadrupling L should multiply T by four or by two.",
        "Choose five L values across the available range, hold all other inputs fixed, and record L and T with units.",
        "Compare T₂/T₁ for simple length ratios, then plot T against L and T² against L.",
        "Select the relation that produces a straight line without systematic residual structure, and inspect the endpoints of the range."
      ],
      "answer": "For the small-angle simple-pendulum model, T² plotted against L is linear, and quadrupling L doubles T.",
      "check": "The ratio T²/L should stay constant and have unit s²/m; an attractive graph without labeled axes does not establish this."
    },
    "pitfall": "Changing several sliders at once destroys the causal comparison: even an effect with the expected sign cannot be attributed confidently to one input.",
    "practice": [
      {
        "question": "A graph changes after a slider is moved. Which three facts must be established before giving a physical explanation?",
        "hint": "Look for the input, the output, and the fixed conditions.",
        "answer": "Name the changed parameter and its unit, the reported quantity and scale, and the parameters and assumptions that remained fixed."
      },
      {
        "question": "At x = 1, 2, and 4 a model returns y = 3, 12, and 48. Which power-law relation is consistent with these data?",
        "hint": "Check how y changes whenever x doubles.",
        "answer": "Every doubling of x multiplies y by four, so the data are consistent with y = 3x². Additional points are needed, and this does not justify extrapolation outside the tested range."
      }
    ]
  },
  "1.1": {
    "topicId": "1.1",
    "question": "Why can a physical result not be reported as a number alone, and how can units expose an error before calculation?",
    "overview": [
      "A physical quantity is defined through comparison with an accepted unit. The expression 12 m states both a numerical value and the kind of property measured; changing the unit changes the number but not the length itself.",
      "A coherent unit system makes measurements and equations comparable. Dimensional analysis tests whether an equation has an admissible structure, while an order-of-magnitude estimate checks whether an answer is plausible before detailed calculation."
    ],
    "conceptExplanations": [
      "A number without a unit usually does not define a result: 5 m, 5 s, and 5 kg describe different quantities. Dimensionless ratios are an exception, but their meaning, such as refractive index, should still be named.",
      "SI is built from seven base units, and derived units are expressed through them. Prefixes denote exact powers of ten: 1 mm = 10⁻³ m and 1 MHz = 10⁶ Hz.",
      "A dimension describes the type of quantity independently of the chosen unit: velocity has dimension L T⁻¹ and force M L T⁻². Only quantities of the same dimension can be added.",
      "Unit conversion uses factors equal to one and retains units at every step. Both sides of a valid physical equality have the same dimensions, although this condition alone cannot prove the equation correct.",
      "An order of magnitude is a nearby characteristic power of ten. A Fermi estimate decomposes a difficult question into measurable factors, estimates each one, and tests whether the final scale is robust."
    ],
    "boundary": "Dimensional homogeneity is necessary but insufficient: it cannot detect a missing dimensionless factor, a wrong sign, or replacing sine with cosine, and every exponential or logarithm requires a dimensionless argument.",
    "example": {
      "title": "Vehicle speed in SI units",
      "problem": "A vehicle travels at 90 km/h over 250 m. Find the travel time and check the units of the result.",
      "steps": [
        "Convert the speed: 90 km/h = 90 × 1000 m / 3600 s = 25 m/s.",
        "Use the definition of uniform speed v = s/t, hence t = s/v.",
        "Substitute coherent units: t = 250 m / (25 m/s) = 10 s.",
        "Check dimensions: L/(L T⁻¹) = T, so the result must indeed be a time."
      ],
      "answer": "The travel time is 10 s, assuming the speed remains 90 km/h over the entire segment.",
      "check": "At 25 m/s the vehicle covers 100 m in four seconds, so 250 m in ten seconds has the expected scale."
    },
    "pitfall": "Do not insert kilometers in one part of an equation and meters in another and expect a calculator to repair the units; first convert all quantities to a coherent system.",
    "practice": [
      {
        "question": "Can 3 m and 4 m/s be added?",
        "hint": "Compare the dimensions of the two terms.",
        "answer": "No. Length has dimension L and velocity has L T⁻¹, so their sum does not define a physical quantity."
      },
      {
        "question": "A density is 1.20 g/cm³. Express it in kg/m³.",
        "hint": "1 g = 10⁻³ kg, while 1 cm³ = 10⁻⁶ m³.",
        "answer": "1.20 g/cm³ = 1.20 × 10⁻³ kg / 10⁻⁶ m³ = 1.20 × 10³ kg/m³ = 1200 kg/m³."
      }
    ]
  },
  "1.2": {
    "topicId": "1.2",
    "question": "How can a measurement report both an estimated value and a justified degree of confidence in it?",
    "overview": [
      "Measurement links an instrument indication to a quantity through calibration and a measurement model. The exact value is usually unavailable, so a modern result includes an estimate, a unit, and uncertainty evaluated from statistics and known influence quantities.",
      "Uncertainty does not mean that an experiment is defective; it describes values compatible with the available information. More repetitions reduce the random contribution to a mean, but calibration bias, method corrections, and correlations must be evaluated separately."
    ],
    "conceptExplanations": [
      "A digital increment or scale division limits distinguishable indications and usually contributes to uncertainty. Resolution is not automatically the total uncertainty because calibration, noise, or method effects may dominate.",
      "Measurement error is a measured value minus a reference value. Because the true value is unknown, an estimated systematic effect is normally corrected while uncertainty in that correction remains.",
      "Standard uncertainty expresses the available information as a standard deviation. It belongs to a particular measurand and measurement model, not to a generic set of possible instrument errors.",
      "A random contribution can be estimated from repeated observations and the uncertainty of their mean. A systematic contribution does not disappear through averaging and requires calibration, a reference material, or a physical model.",
      "Absolute uncertainty uses the unit of the result, while relative uncertainty is their ratio. Expanded uncertainty U = ku is reported together with coverage factor k and the adopted coverage probability.",
      "For a function of several inputs, small uncertainties propagate through sensitivity derivatives. If inputs are correlated, covariance terms can either increase or decrease the combined uncertainty."
    ],
    "boundary": "Statistical formulas for independent, identically distributed repetitions cannot be applied uncritically to drifting, rounded, or correlated data; distribution assumptions also matter for a small sample.",
    "example": {
      "title": "Combining scatter and resolution",
      "problem": "A diameter is measured five times as 10.0, 10.1, 9.9, 10.0, and 10.0 mm. A digital instrument has a 0.1 mm increment. Estimate standard uncertainty of the mean, treating rounding as uniform and independent of the observed scatter.",
      "steps": [
        "The mean is 10.00 mm and the sample standard deviation of the five indications is about 0.071 mm.",
        "The repeatability standard uncertainty of the mean is 0.071/√5 ≈ 0.032 mm.",
        "For rounding over a 0.1 mm interval, the standard contribution is 0.1/√12 ≈ 0.029 mm.",
        "Combine independent contributions in quadrature: u = √(0.032² + 0.029²) ≈ 0.043 mm."
      ],
      "answer": "The result may be written d = (10.00 ± 0.04) mm with standard uncertainty; this is not an expanded coverage interval.",
      "check": "The combined contribution is larger than either component but smaller than their arithmetic sum, as expected for independent components combined in quadrature."
    },
    "pitfall": "A ± value without stating whether it is standard uncertainty, a confidence interval, a tolerance limit, or instrument resolution is ambiguous and cannot support a sound comparison.",
    "practice": [
      {
        "question": "After one hundred repetitions the mean is stable, but a reference reveals a constant +0.4 °C bias. Will another thousand repetitions solve the problem?",
        "hint": "Separate random scatter from a systematic effect.",
        "answer": "No. Repetition reduces the random contribution to uncertainty of the mean, but the constant bias must be corrected using calibration and uncertainty of that correction retained."
      },
      {
        "question": "Independent quantities x = 2.00 ± 0.02 and y = 3.0 ± 0.1 have standard uncertainties. Estimate z = xy.",
        "hint": "For a product, add squared relative uncertainties.",
        "answer": "z = 6.0 and uᵣ(z) ≈ √((0.02/2.00)² + (0.1/3.0)²) ≈ 0.035. Thus u(z) ≈ 0.21 and a sensible report is z = 6.0 ± 0.2."
      }
    ]
  },
  "1.3": {
    "topicId": "1.3",
    "question": "How can a finite, noisy data set be used to choose a model without hiding inconvenient observations?",
    "overview": [
      "Raw data become a physical result after the procedure is documented, the distribution is visualized, and predictions are compared with observations. A mean describes a center only alongside a measure of spread, while a residual plot can reveal failures hidden by a single goodness metric.",
      "Model fitting estimates parameters under assumptions about the noise. It does not turn correlation into causation: a causal conclusion also requires a mechanism, temporal ordering, and a design that excludes plausible confounding factors."
    ],
    "conceptExplanations": [
      "The mean summarizes the level of a series and standard deviation describes scatter of individual observations. Standard uncertainty of the mean decreases approximately as 1/√n only for independent, stable measurements.",
      "A histogram depends on bin width and displays an empirical distribution shape. A normal distribution often arises from a sum of small independent contributions, but it is not a universal law for all data.",
      "An observation should be excluded only by a predefined physical or procedural criterion, such as a confirmed sensor failure. Removing a point merely because it damages the plot biases the result.",
      "A residual is observation minus prediction. A random cloud consistent with noise supports the model shape, whereas curvature, trend, or changing width indicates an omitted dependence or an unsuitable noise model.",
      "Two quantities can move together because of a third factor, a shared trend, or data selection. Even a strong correlation coefficient does not establish the direction of causation."
    ],
    "boundary": "Ordinary linear regression assumes a correct model form and a suitable description of errors; outliers, unequal variance, uncertainty in x, and temporal autocorrelation require another method or explicit modeling.",
    "example": {
      "title": "Testing a straight line with residuals",
      "problem": "For x = 0, 1, 2, 3, observations are y = 1.1, 3.0, 4.9, 7.2. Is the trial model y = 1 + 2x adequate at a precision scale of about 0.2?",
      "steps": [
        "Calculate model predictions: 1.0, 3.0, 5.0, and 7.0.",
        "Find residuals yobs − ymodel: +0.1, 0.0, −0.1, and +0.2.",
        "Compare their scale with the stated 0.2 precision and plot residuals against x.",
        "Look for monotonic curvature or increasing scatter; four points are insufficient for a sensitive distribution test."
      ],
      "answer": "All residuals are no larger than 0.2 and show no obvious trend, so the data are compatible with the trial line at this precision, but do not identify it as the only possible model.",
      "check": "The mean residual is 0.05, small on the 0.2 scale; this does not replace evaluation of parameter uncertainties."
    },
    "pitfall": "A high R² does not prove a physical law: a common time trend can produce it, while a systematic residual pattern still exposes model failure.",
    "practice": [
      {
        "question": "One point is far from all others, but the notebook records no malfunction. May it be deleted before fitting?",
        "hint": "Distinguish statistical surprise from an established cause of error.",
        "answer": "Not automatically. Inspect the primary record, test robustness with and without the point, apply a justified predeclared criterion, and report the decision transparently."
      },
      {
        "question": "Find the mean of 4.8, 5.0, 5.2, and 5.0, then sum their deviations from the mean.",
        "hint": "Add the four values first; deviations from an arithmetic mean have a special property.",
        "answer": "The mean is 5.0. The deviations −0.2, 0, +0.2, and 0 sum to zero, as they must for an arithmetic mean."
      }
    ]
  },
  "1.4": {
    "topicId": "1.4",
    "question": "How can the shape and scale of a graph reveal a physical change rather than only coordinates of separate points?",
    "overview": [
      "A function assigns an outcome to an independent variable while other conditions are fixed. A graph exposes sign, rate of change, extrema, and characteristic scales, but its meaning is determined by axis labels and the physical setup.",
      "Slope and area acquire units from their axes. The slope of position against time is velocity, and the area under velocity against time is displacement; the same geometric operations on different axes represent different quantities."
    ],
    "conceptExplanations": [
      "An independent variable is selected or used as an argument, while a dependent variable is measured or calculated. This does not always imply causation: in observational data both may depend on a third quantity.",
      "For y ∝ x, y/x is constant; for y ∝ 1/x, xy is constant; and for y ∝ x², y/x² is constant. An exponential has a constant relative rather than absolute change over equal intervals.",
      "A logarithmic axis maps equal ratios to equal distances. A straight line on a semilog plot indicates an exponential, while a straight line on a log-log plot indicates a power law for positive quantities.",
      "Local slope is a ratio of small coordinate changes with units of the vertical quantity per horizontal quantity. Signed area accumulates their product and counts regions below zero negatively.",
      "Before calculating, identify where a quantity rises, changes sign, or reaches an extremum. This qualitative prediction catches substitution errors and inappropriate scales."
    ],
    "boundary": "The apparent shape depends on axis range and scale; connecting sparse points does not establish behavior between them, and slope or area has physical meaning only for specifically defined quantities.",
    "example": {
      "title": "Reading a velocity graph",
      "problem": "A body's velocity is v(t) = 2 + 3t in SI units from 0 to 4 s. What do the slope and area under the graph represent?",
      "steps": [
        "The line's slope Δv/Δt is 3 (m/s)/s = 3 m/s², the constant acceleration.",
        "The vertical intercept gives initial velocity 2 m/s.",
        "Displacement is the trapezoid area: average height (2 + 14)/2 m/s multiplied by 4 s.",
        "This gives Δx = 32 m, also obtained from ∫₀⁴(2 + 3t)dt."
      ],
      "answer": "Acceleration is 3 m/s² and displacement over four seconds is 32 m along the positive axis.",
      "check": "The average velocity 8 m/s lies between the initial 2 and final 14 m/s, so 32 m has a sensible scale."
    },
    "pitfall": "Visual steepness cannot be compared across graphs with different scales: the same numerical slope can look almost horizontal or almost vertical.",
    "practice": [
      {
        "question": "Why does a straight line on a plot of ln y against x indicate an exponential y(x)?",
        "hint": "Write the straight-line equation for ln y and exponentiate it.",
        "answer": "If ln y = a + bx, then y = eᵃeᵇˣ. The slope b is a constant relative rate and eᵃ is the initial factor."
      },
      {
        "question": "Velocity falls linearly from 12 m/s to zero over 6 s and remains nonnegative. Find the displacement.",
        "hint": "The region under v(t) is a triangle.",
        "answer": "The triangular area is ½ × 6 s × 12 m/s = 36 m."
      }
    ]
  },
  "1.5": {
    "topicId": "1.5",
    "question": "When is one number sufficient to describe a quantity, and when does omitting direction make a prediction ambiguous?",
    "overview": [
      "A scalar is specified by a value with a unit and remains unchanged when coordinates are rotated, whereas a vector also carries a geometrical direction. Temperature and mass are scalars; displacement, velocity, and force are vectors.",
      "A vector can be drawn as an arrow and translated parallel to itself when it is free. Geometrical rules for addition and scalar multiplication do not depend on coordinates, although components change when axes rotate."
    ],
    "conceptExplanations": [
      "The same positive speed does not say where an object moves. Velocity resolves this ambiguity as a vector, whereas scalar speed retains only its magnitude.",
      "Magnitude is a nonnegative scalar with the same unit as the vector. Direction may be given by an angle, a unit vector, or components relative to explicitly chosen axes.",
      "Two free vectors are equal when their magnitudes and directions agree. Their locations are irrelevant; for a bound vector such as a force on a rigid body, the point of application can affect rotation.",
      "A sum follows the triangle or parallelogram rule and represents sequential or combined action. The difference a − b is the sum of a and the reversed vector −b.",
      "Multiplication by a positive scalar changes magnitude, by a negative scalar also reverses direction, and multiplication by zero gives a zero vector with no defined direction."
    ],
    "boundary": "Not every multicomponent quantity is an ordinary vector: stress is a tensor, and finite rotations in three dimensions do not add as free vectors.",
    "example": {
      "title": "Result of two displacements",
      "problem": "An object moves by a = (3, 4) m and then by b = (−1, 2) m. Find the resultant vector, its magnitude, and its direction from +x.",
      "steps": [
        "Add corresponding components: a + b = (3 − 1, 4 + 2) m = (2, 6) m.",
        "Find the magnitude: |a + b| = √(2² + 6²) = √40 m ≈ 6.32 m.",
        "The angle satisfies tan θ = 6/2 = 3; both components are positive, so the vector is in the first quadrant.",
        "Thus θ ≈ 71.6° measured from the positive x direction."
      ],
      "answer": "The resultant displacement is (2, 6) m, with magnitude about 6.32 m and direction 71.6° from +x.",
      "check": "Its magnitude does not exceed |a| + |b| = 5 + √5 ≈ 7.24 m, consistent with the triangle inequality."
    },
    "pitfall": "Magnitudes may be added instead of vectors only when directions agree; in any other geometry this overestimates or underestimates the resultant.",
    "practice": [
      {
        "question": "Is work a scalar or a vector even though force and displacement are vectors?",
        "hint": "Recall the type of result produced by a dot product.",
        "answer": "Work is a scalar: W = F · s. Its sign depends on the relative directions of force and displacement, but work itself has no spatial direction."
      },
      {
        "question": "Find the sum of (5, −2) N and (−3, 7) N and its magnitude.",
        "hint": "Add components, then use the Pythagorean theorem.",
        "answer": "The sum is (2, 5) N and its magnitude is √(2² + 5²) = √29 N ≈ 5.39 N."
      }
    ]
  },
  "1.6": {
    "topicId": "1.6",
    "question": "How do chosen axes turn a geometrical vector into computable components, and what do dot and cross products measure?",
    "overview": [
      "A projection asks how much of a vector points along a selected axis. Components in an orthonormal basis reconstruct the entire vector and turn one vector equation into independent scalar equations along the axes.",
      "Vector products encode different geometry. The dot product measures alignment and appears in work, whereas the cross product measures oriented area and appears in torque and angular momentum."
    ],
    "conceptExplanations": [
      "The orthogonal projection aₓ = |a|cos θ is a signed number. It is the length of a shadow with a plus or minus sign determined by direction relative to the positive half-axis.",
      "A vector perpendicular to an axis has zero projection although its magnitude is nonzero. A negative projection means opposite direction, not a negative length.",
      "Two dimensions require two independent coordinates and three dimensions require three. Axes are a choice, but an orthonormal basis often simplifies lengths and products.",
      "A vector is the sum of components times basis vectors: a = aₓeₓ + aᵧeᵧ + a_z e_z. Under a basis change the numbers transform consistently while the geometrical vector does not change.",
      "a · b = |a||b|cos θ is positive for an acute angle, zero for perpendicular vectors, and negative for an obtuse angle. In an orthonormal basis it is the sum of componentwise products.",
      "|a × b| = |a||b|sin θ is the parallelogram area, with direction set by the right-hand rule. Interchanging the factors reverses the result."
    ],
    "boundary": "Simple component sums for length and dot product assume an orthonormal Euclidean basis; curvilinear or oblique coordinates require a metric and position-dependent basis vectors.",
    "example": {
      "title": "Work and torque from one force",
      "problem": "A force F = (3, 4, 0) N acts through displacement s = (2, 0, 0) m; its point of application is r = (2, 0, 0) m from the origin. Find work and torque.",
      "steps": [
        "Work is the dot product: W = F · s = 3×2 + 4×0 = 6 J.",
        "The 4 N component is perpendicular to displacement and does no work during this displacement.",
        "Torque is τ = r × F; its nonzero component is τ_z = rₓFᵧ − rᵧFₓ = 2×4 = 8 N·m.",
        "The right-hand rule gives the +z direction."
      ],
      "answer": "The work is 6 J and the torque about the origin is (0, 0, 8) N·m.",
      "check": "The units need interpretation: work and torque magnitude both have dimension N·m, but torque is a rotational vector quantity and is not expressed in joules."
    },
    "pitfall": "Do not confuse a component with a magnitude: a component may be negative, whereas vector magnitude is nonnegative by definition.",
    "practice": [
      {
        "question": "What does a · b = 0 imply for two nonzero Euclidean vectors?",
        "hint": "Use cos θ in the definition of the product.",
        "answer": "The vectors are perpendicular because nonzero magnitudes require cos θ = 0."
      },
      {
        "question": "Calculate (2, −1, 3) · (4, 5, 0).",
        "hint": "Multiply corresponding components and add.",
        "answer": "2×4 + (−1)×5 + 3×0 = 3. Its unit is the product of the units of the input quantities."
      }
    ]
  },
  "1.7": {
    "topicId": "1.7",
    "question": "How does a local rule of change become a prediction of a system's state after a finite time?",
    "overview": [
      "A derivative is the limiting ratio of a small change in a quantity to a small change in its argument. An integral performs the inverse accumulation: it sums infinitesimal contributions and needs an initial value to reconstruct a particular history.",
      "Most dynamical laws specify a rate of change rather than a finished trajectory. A differential equation plus initial and boundary conditions defines evolution, while a numerical method approximates it with finite steps whose error must be controlled."
    ],
    "conceptExplanations": [
      "An average rate refers to a finite interval, while a derivative belongs to an instant. On a graph it is the tangent slope and has the unit of the dependent quantity divided by the unit of its argument.",
      "A definite integral includes the sign of contributions and is geometrically a signed area. For example, integrating power over time gives transferred energy.",
      "A finite increment equals the integral of the instantaneous rate. Over a small step it can be approximated by derivative times step, but repeated local errors accumulate.",
      "A differential equation relates an unknown function to its derivatives. The same rule can produce different solutions from different initial states, so the equation alone is insufficient.",
      "Euler's method replaces a curve by successive tangent steps. A smaller step often improves accuracy, but stability and convergence rate depend on both the equation and method."
    ],
    "boundary": "A derivative requires a defined limiting process, and simple time stepping can become unstable; numerical results should be checked by reducing the step, monitoring conservation laws, and comparing known limits.",
    "example": {
      "title": "From acceleration to velocity and displacement",
      "problem": "A body moves along an axis with a(t) = −2t m/s², v(0) = 10 m/s, and x(0) = 0. Find its velocity and displacement at t = 3 s.",
      "steps": [
        "Integrate acceleration: v(t) = v(0) + ∫₀ᵗ(−2τ)dτ = 10 − t².",
        "At t = 3 s, velocity is 10 − 9 = 1 m/s.",
        "Integrate velocity: x(t) = ∫₀ᵗ(10 − τ²)dτ = 10t − t³/3.",
        "At t = 3 s, x = 30 − 9 = 21 m."
      ],
      "answer": "After 3 s the velocity is 1 m/s and displacement is 21 m in the positive direction.",
      "check": "Velocity stays positive but decreases from 10 to 1 m/s, so displacement must lie between 3 and 30 m; 21 m passes this scale check."
    },
    "pitfall": "Integrating a derivative gives a family of functions: the missing constant is fixed by an initial condition and can completely change the physical solution.",
    "practice": [
      {
        "question": "Why does dx/dt = 2 not uniquely specify x(t)?",
        "hint": "What information about a constant offset disappears upon differentiation?",
        "answer": "Every function x(t) = 2t + C has the same derivative. An initial condition such as x(0) is needed to determine C."
      },
      {
        "question": "For dv/dt = −0.5v and v₀ = 10 m/s, perform one explicit Euler step of length 0.2 s.",
        "hint": "Use v₁ = v₀ + Δt(−0.5v₀).",
        "answer": "v₁ = 10 + 0.2×(−5) = 9.0 m/s. The exact value 10e⁻⁰·¹ ≈ 9.05 m/s displays the finite-step error."
      }
    ]
  },
  "2.1": {
    "topicId": "2.1",
    "question": "What information lets two observers describe the same event unambiguously and transform its coordinates between reference frames?",
    "overview": [
      "Kinematics describes motion relative to a chosen reference frame. One specifies a reference body, spatial axes, an origin, and a clock-synchronization procedure; without these conventions, a statement about position or velocity is incomplete.",
      "An event is a localized occurrence with spatial coordinates and a time. Coordinates of one event depend on the frame, but observers can relate them by a transformation and agree on which physical occurrence is being described."
    ],
    "conceptExplanations": [
      "A point particle retains mass and trajectory but omits size, shape, and orientation. It is adequate when these properties affect the requested result only weakly compared with the scale of motion.",
      "A reference body physically anchors the coordinates, axes assign numbers to positions, and a clock assigns times. Origin and orientation are conventions that must accompany the data.",
      "A sensor flash at one place and instant is an event. A trajectory, by contrast, represents a sequence of events along the body's worldline.",
      "An object may rest relative to a railcar and move relative to a platform. Rest and velocity are therefore not properties of a body without an observer, although mechanical laws have the same form in all inertial frames."
    ],
    "boundary": "The Galilean transformation with universal time applies at speeds much smaller than light speed; at relativistic speeds synchronization and simultaneity depend on frame and Lorentz transformations are required.",
    "example": {
      "title": "An event in a railcar and on a platform",
      "problem": "A railcar moves along +x at 20 m/s. Origins coincide when both clocks read zero. At 5 s a passenger is 7.5 m ahead of the car's origin. Where does this event occur in the platform frame?",
      "steps": [
        "Denote the coordinate in the car as x′ = 7.5 m and time as t′ = 5 s.",
        "In classical kinematics use t = t′ and x = x′ + Vt.",
        "Insert V = 20 m/s: x = 7.5 m + 20 m/s × 5 s.",
        "The result is x = 107.5 m from the agreed platform origin."
      ],
      "answer": "The event is (x′, t′) = (7.5 m, 5 s) in the car and (x, t) = (107.5 m, 5 s) on the platform in the Galilean approximation.",
      "check": "The car origin has traveled 100 m and the passenger is another 7.5 m ahead, confirming both sign and scale."
    },
    "pitfall": "Coordinates or velocities from different frames cannot be compared until the transformation between origins, axes, and clocks is specified.",
    "practice": [
      {
        "question": "A book lies on a table in a moving train. Can its velocity be called zero without qualification?",
        "hint": "Name at least two possible reference frames.",
        "answer": "No. Its velocity is zero relative to the car but approximately the train's velocity relative to Earth."
      },
      {
        "question": "Frame S′ moves at 6 m/s along +x relative to S and origins coincide at t = 0. An event has x′ = −2 m at t = 4 s. Find x in S.",
        "hint": "Use x = x′ + Vt.",
        "answer": "x = −2 m + 6 m/s × 4 s = 22 m."
      }
    ]
  },
  "2.2": {
    "topicId": "2.2",
    "question": "Why do endpoints determine displacement but not reveal the distance traveled between them?",
    "overview": [
      "A body's position at a selected time is given by a position vector from the origin. The sequence of positions forms a trajectory, and its length over a time interval is the scalar distance traveled.",
      "Displacement is final minus initial position vector. It is independent of path shape, so motions with the same endpoints have the same displacement while covering very different distances."
    ],
    "conceptExplanations": [
      "The position vector r(t) depends on the chosen origin and coordinates but uniquely locates the body in that frame. Its components are the body's coordinates.",
      "A trajectory is a geometrical curve, while distance s is accumulated length along it. Distance never decreases and depends on every intermediate segment.",
      "Displacement Δr = r₂ − r₁ points directly from the initial to the final point. It is zero after returning to the starting point regardless of the route traveled.",
      "The inequality |Δr| ≤ s always holds. Equality occurs for motion along a straight segment without reversal; detours and returns increase distance."
    ],
    "boundary": "Distance as curve length assumes a sufficiently regular path and a chosen spatial geometry; at finite measurement precision, fine-scale roughness depends on resolution.",
    "example": {
      "title": "A semicircle instead of a diameter",
      "problem": "An object follows the upper semicircle of radius 10 m from (10, 0) m to (−10, 0) m. Find distance and displacement.",
      "steps": [
        "The semicircle length is half of 2πR: s = πR = 10π m.",
        "Initial position is r₁ = (10, 0) m and final position is r₂ = (−10, 0) m.",
        "Displacement is Δr = r₂ − r₁ = (−20, 0) m.",
        "Its magnitude is 20 m, less than distance 10π m ≈ 31.4 m."
      ],
      "answer": "Distance is 10π m ≈ 31.4 m, while displacement is (−20, 0) m with magnitude 20 m.",
      "check": "The shortest separation of the endpoints is the 20 m diameter, so the arc cannot be shorter than displacement magnitude."
    },
    "pitfall": "Distance traveled cannot carry a minus sign: it is accumulated length; a sign belongs to a displacement component along a chosen axis.",
    "practice": [
      {
        "question": "A runner completes one 400 m lap and returns to the start. What are distance and displacement?",
        "hint": "Only endpoints matter for displacement.",
        "answer": "Distance is 400 m, while the displacement vector and its magnitude are zero."
      },
      {
        "question": "An object moves 3 m east and 4 m north. Find distance and displacement magnitude.",
        "hint": "Distance adds segments; displacement joins start to finish.",
        "answer": "Distance is 7 m. Displacement has components (3, 4) m and magnitude 5 m."
      }
    ]
  },
  "2.3": {
    "topicId": "2.3",
    "question": "Which velocity describes an entire interval of motion, and which describes the body at one instant?",
    "overview": [
      "Average speed is total distance divided by duration and carries no direction. Average velocity uses displacement, so it can be zero even after a large distance has been traveled.",
      "Instantaneous velocity is the limit over ever shorter intervals, the time derivative of position. It is tangent to the trajectory and points along the motion, while its magnitude is instantaneous speed."
    ],
    "conceptExplanations": [
      "The quantity s/Δt averages the rate at which distance accumulates and is nonnegative. It cannot recover direction or final position.",
      "The vector Δr/Δt joins the endpoints of the selected interval. Its magnitude cannot exceed average speed because |Δr| ≤ s.",
      "The limit of Δr/Δt as Δt → 0 is dr/dt and geometrically gives the tangent slope of a position graph. It describes local motion, not the preceding route.",
      "On a smooth curve, velocity is tangent to the path. Its direction changes in a turn even when speed remains constant."
    ],
    "boundary": "Instantaneous velocity is defined where the trajectory is differentiable; an ideal instantaneous corner implies unbounded acceleration and requires a more detailed transition model.",
    "example": {
      "title": "Average velocities on an out-and-back route",
      "problem": "An object moves 100 m east and then 60 m west in a total time of 80 s. Find average speed and average velocity.",
      "steps": [
        "Total distance is s = 100 + 60 = 160 m.",
        "Average speed is s/Δt = 160/80 = 2.0 m/s.",
        "Choose east as +x; displacement is Δx = 100 − 60 = 40 m.",
        "Average velocity has component 40/80 = +0.50 m/s."
      ],
      "answer": "Average speed is 2.0 m/s and average velocity is 0.50 m/s east.",
      "check": "Average velocity magnitude is smaller than average speed because part of the route was retraced."
    },
    "pitfall": "Segment speeds generally cannot be combined by a simple arithmetic mean: their weights are segment times, and equal distances usually take unequal times.",
    "practice": [
      {
        "question": "Can instantaneous velocity be nonzero when average velocity over a full interval is zero?",
        "hint": "Imagine completing a full lap and returning to the start.",
        "answer": "Yes. Displacement and average velocity over a full lap are zero, while instantaneous velocity is nonzero and tangent to the circle at ordinary points of the motion."
      },
      {
        "question": "Position is x(t) = 2t² + 1 m. Find instantaneous velocity at t = 3 s.",
        "hint": "Differentiate x with respect to t.",
        "answer": "v(t) = 4t m/s, so v(3 s) = 12 m/s along +x."
      }
    ]
  },
  "2.4": {
    "topicId": "2.4",
    "question": "How does a change in the velocity vector reveal whether a body speeds up, slows down, or merely turns?",
    "overview": [
      "Acceleration is the derivative of vector velocity, so it responds to a change in either magnitude or direction. Uniform circular motion has nonzero inward acceleration even though speed is constant.",
      "The graphs x(t), v(t), and a(t) are connected by derivatives and integrals. The sign of acceleration alone does not mean speeding up: speed grows when velocity and acceleration align and falls when they oppose."
    ],
    "conceptExplanations": [
      "Average acceleration is Δv/Δt and instantaneous acceleration is dv/dt. Because vectors are subtracted, equal speed magnitudes in different directions still produce a nonzero change.",
      "In one dimension a body speeds up when va > 0 and slows when va < 0. In several dimensions a perpendicular change can bend the path without changing speed.",
      "The slope of x(t) is v and the slope of v(t) is a; signed area under v(t) is displacement and under a(t) is velocity change. An extremum of x often has v = 0 but need not imply rest over a finite interval.",
      "With constant acceleration, velocity is linear in time and position is quadratic. The equations require one inertial frame and consistent initial conditions.",
      "For variable acceleration, motion is obtained by integration or time stepping. The step must be short compared with the acceleration's change timescale and convergence must be checked."
    ],
    "boundary": "Constant-acceleration equations fail when acceleration changes appreciably with time, position, or velocity; a piecewise-constant approximation needs an error check at step boundaries.",
    "example": {
      "title": "A reversal on a velocity graph",
      "problem": "Along a chosen axis, v(t) = 4 − 2t m/s from 0 to 3 s. Find acceleration, displacement, and distance traveled.",
      "steps": [
        "Velocity has constant derivative a = −2 m/s².",
        "Velocity reaches zero at t = 2 s; afterward the body moves in the negative direction.",
        "Displacement is ∫₀³(4 − 2t)dt = 12 − 9 = 3 m.",
        "Distance is unsigned area: 4 m before the stop plus 1 m after reversal, totaling 5 m."
      ],
      "answer": "Acceleration is −2 m/s², displacement is +3 m, and distance is 5 m; the body first slows and then speeds up along −x.",
      "check": "Final velocity −2 m/s confirms that the last segment subtracts from displacement but adds to distance."
    },
    "pitfall": "Negative acceleration does not always mean slowing down: if velocity is also negative, their alignment increases speed.",
    "practice": [
      {
        "question": "A car travels around a circle at a constant 15 m/s. Does it accelerate?",
        "hint": "Velocity is a vector, not only its magnitude.",
        "answer": "Yes. Velocity direction changes continuously, so the car has inward normal acceleration even though speed is constant."
      },
      {
        "question": "An object moves in a circle of radius 20 m at 10 m/s. Find normal acceleration.",
        "hint": "Use aₙ = v²/R.",
        "answer": "aₙ = (10 m/s)² / 20 m = 5.0 m/s² toward the center."
      }
    ]
  },
  "2.5": {
    "topicId": "2.5",
    "question": "Why does horizontal motion not change the fall time of a projectile in the ideal model?",
    "overview": [
      "Near Earth's surface over modest heights, gravity can be treated as uniform: acceleration points vertically downward and is approximately g. Without air drag, horizontal velocity remains constant while vertical velocity evolves independently under constant acceleration.",
      "A common time parameter joins the components into a parabolic trajectory. Range, height, and flight time follow from initial speed, angle, and height difference; mass cancels because gravitational force and inertia contain the same mass."
    ],
    "conceptExplanations": [
      "In a local frame with +y upward, aᵧ = −g. The value of g varies slightly with latitude and altitude, but 9.81 m/s² is normally sufficient for near-surface exercises.",
      "The equations x = x₀ + v₀ₓt and y = y₀ + v₀ᵧt − gt²/2 share t, but the horizontal equation contains no vertical quantity. That is component independence in this model.",
      "A horizontal launch has v₀ᵧ = 0, while an angled launch has v₀ₓ = v₀cos θ and v₀ᵧ = v₀sin θ. After decomposition, the same component equations apply.",
      "For equal launch and landing heights, flight time is 2v₀sin θ/g, maximum height above launch is v₀²sin²θ/(2g), and range is v₀²sin 2θ/g.",
      "Drag depends on velocity relative to air and usually couples the components. It shortens range, destroys ascent-descent symmetry, and makes the trajectory nonparabolic."
    ],
    "boundary": "A parabolic path requires uniform g, no drag, locally flat geometry, and constant mass; long, fast, or aerodynamically important flights need a numerical model including curvature, Earth rotation, and drag.",
    "example": {
      "title": "Angled launch with equal endpoint heights",
      "problem": "A projectile is launched at 20 m/s and 30° above horizontal. Find flight time, range, and maximum height for g = 9.81 m/s² with no air drag.",
      "steps": [
        "Resolve velocity: v₀ₓ = 20cos30° ≈ 17.32 m/s and v₀ᵧ = 20sin30° = 10.0 m/s.",
        "Return to launch height gives t_f = 2v₀ᵧ/g ≈ 2.04 s.",
        "Range is R = v₀ₓt_f ≈ 17.32 × 2.04 ≈ 35.3 m.",
        "At the apex vᵧ = 0, so H = v₀ᵧ²/(2g) ≈ 5.10 m."
      ],
      "answer": "Flight time is about 2.04 s, range 35.3 m, and maximum height above launch 5.10 m.",
      "check": "Ascent lasts v₀ᵧ/g ≈ 1.02 s, exactly half the full time in this symmetric model."
    },
    "pitfall": "The range equation R = v₀²sin 2θ/g assumes equal launch and landing heights; it cannot be used for a cliff launch without solving the vertical equation.",
    "practice": [
      {
        "question": "Two bodies of different mass are released together from one height in vacuum. Which lands first?",
        "hint": "Apply the second law with gravitational force mg.",
        "answer": "They land together under equal initial conditions: ma = mg gives a = g independently of mass."
      },
      {
        "question": "A body is launched horizontally at 10 m/s from a height of 20 m. Estimate flight time and range for g = 9.81 m/s².",
        "hint": "First solve 0 = 20 − gt²/2, then use x = v₀ₓt.",
        "answer": "t = √(40/9.81) ≈ 2.02 s and R ≈ 10 × 2.02 = 20.2 m without air drag."
      }
    ]
  },
  "2.6": {
    "topicId": "2.6",
    "question": "How is motion measured inside a moving frame related to the path seen from Earth and to turning along a curve?",
    "overview": [
      "In classical mechanics, a body's velocity relative to Earth is the vector sum of its velocity relative to a moving medium and the medium's velocity. Vectors rather than magnitudes explain drift of boats in currents, aircraft in wind, and the apparent direction of rain.",
      "Curved motion can be decomposed into a change of speed along the tangent and a change of direction toward the center of curvature. For a circle, angular and linear quantities are linked by radius, and normal acceleration remains even at constant speed."
    ],
    "conceptExplanations": [
      "Galilean velocity addition is v_A/C = v_A/B + v_B/C. All three vectors must refer to the same event and consistently aligned, nonrotating axes.",
      "To cancel a cross-current or crosswind, choose the heading so that the transverse component of velocity through the medium cancels the medium velocity. If the required component exceeds available speed, the exact course is impossible.",
      "Rotation angle is measured in radians; angular velocity is ω = dφ/dt and angular acceleration α = dω/dt. A point at radius R has speed v = ωR.",
      "Tangential acceleration a_t = dv/dt changes speed, while normal acceleration a_n = v²/R points to the local center of curvature and turns velocity.",
      "For uniform circular motion, period T = 2π/ω, speed v = 2πR/T, and acceleration is v²/R. The coordinate components vary sinusoidally."
    ],
    "boundary": "Simple velocity addition assumes speeds much smaller than c and frames without relative rotation; in an accelerating medium or variable current, frame velocity depends on time and position.",
    "example": {
      "title": "A boat crossing a river",
      "problem": "A boat points due north and moves at 4 m/s relative to water; the current is 3 m/s east. The river is 200 m wide. Find shore-relative velocity, crossing time, and drift.",
      "steps": [
        "Add components: vshore = (3 east, 4 north) m/s.",
        "Magnitude is √(3² + 4²) = 5 m/s and direction is arctan(3/4) ≈ 36.9° east of north.",
        "The 4 m/s northward component gives crossing time 200/4 = 50 s.",
        "During that time the current produces 3 × 50 = 150 m eastward drift."
      ],
      "answer": "Relative to shore the boat moves at 5 m/s, 36.9° east of north, crosses in 50 s, and drifts 150 m downstream.",
      "check": "The actual straight path is √(200² + 150²) = 250 m long; at 5 m/s it indeed takes 50 s."
    },
    "pitfall": "Adding speed magnitudes 4 + 3 would give 7 m/s, but perpendicular velocity vectors combine by the Pythagorean theorem and give 5 m/s.",
    "practice": [
      {
        "question": "Why does rain appear slanted to a passenger in a uniformly moving car when drops fall vertically relative to Earth?",
        "hint": "Subtract the car velocity from the drop velocity.",
        "answer": "Relative rain velocity is vrain/car = vrain/Earth − vcar/Earth and therefore has a horizontal component opposite the car's motion."
      },
      {
        "question": "A point moves in a circle of radius 30 m at 12 m/s. Find angular velocity and normal acceleration.",
        "hint": "Use ω = v/R and aₙ = v²/R.",
        "answer": "ω = 12/30 = 0.40 rad/s and aₙ = 12²/30 = 4.8 m/s² toward the center."
      }
    ]
  },
  "3.1": {
    "topicId": "3.1",
    "question": "How should a body be selected so that a diagram contains only forces actually exerted on it by its surroundings?",
    "overview": [
      "Force is not something stored inside a body; it is a vector description of a particular interaction. Before applying the second law, select a system, list external objects that interact with it, and draw one force for each interaction on a free-body diagram.",
      "A good diagram separates geometry from dynamics. It shows chosen axes and forces, but not velocity, acceleration, an assumed direction of motion, or forces exerted on other bodies; each force is then projected onto the axes."
    ],
    "conceptExplanations": [
      "Gravitational, electromagnetic, and contact forces describe one object's effect on another. A force label should identify both the source and the body receiving it.",
      "The system boundary decides which forces are external. If two connected blocks are treated together, tension between them is internal; for one block, the same tension is external.",
      "Internal forces can change relative motion of parts but cancel pairwise from the total momentum balance of a closed system. Interaction with objects beyond the boundary supplies external influence.",
      "A separate sketch isolates the selected body and shows force arrows, including points or lines of action when torque matters. The diagram turns a verbal problem into a vector equation.",
      "Velocity and acceleration are not forces, and an inertial force appears only after an explicit choice of a non-inertial frame. The third-law partner acts on another body and does not belong on this diagram."
    ],
    "boundary": "A force diagram depends on both system boundary and reference frame; a non-inertial frame needs explicitly labeled inertial forces to retain the form ma = ΣF, while an extended body may also require torques and distributed loads.",
    "example": {
      "title": "A block on a horizontal surface",
      "problem": "A 5.0 kg block is pulled horizontally with 18 N while kinetic friction is 3 N. Draw the force balance and find acceleration for g = 9.81 m/s².",
      "steps": [
        "Choose the block alone as the system. Earth exerts mg downward, the support exerts N upward, the pull is 18 N right, and friction is 3 N left.",
        "There is no vertical acceleration, so N − mg = 0 and N = 49.05 N.",
        "The horizontal resultant is 18 − 3 = 15 N to the right.",
        "From ΣFₓ = maₓ, aₓ = 15/5.0 = 3.0 m/s²."
      ],
      "answer": "The block accelerates at 3.0 m/s² to the right; vertical forces cancel.",
      "check": "Acceleration follows the resultant, not necessarily velocity, and N/kg is equivalent to m/s²."
    },
    "pitfall": "Do not draw both the support force on the block and the block's force on the support on one block diagram: they are a third-law pair acting on different bodies.",
    "practice": [
      {
        "question": "Which forces belong on the diagram of a book resting on a table?",
        "hint": "Name an external source for every arrow.",
        "answer": "Earth's gravitational force downward and the table's normal force upward. Their equality follows from zero acceleration, not from Newton's third law."
      },
      {
        "question": "A 2 kg body experiences 7 N right and 3 N left. Find its acceleration.",
        "hint": "Find the vector sum of forces first.",
        "answer": "The resultant is 4 N right, so a = 4/2 = 2 m/s² right."
      }
    ]
  },
  "3.2": {
    "topicId": "3.2",
    "question": "Why is no continuous force needed to maintain uniform motion, and how can an inertial frame be recognized?",
    "overview": [
      "The first law rejects the idea that force maintains velocity. If external forces cancel, a body stays at rest or moves uniformly in a straight line; force is required to change the velocity vector.",
      "The law also defines the class of inertial frames. Any frame moving uniformly without rotation relative to an inertial frame is also inertial, and internal mechanical experiments cannot identify absolute uniform rest."
    ],
    "conceptExplanations": [
      "After a push ends, an ideal body need not stop. Everyday objects slow because of friction and drag, not because a sustaining force is absent.",
      "An inertial frame is one in which a free body has constant velocity. Acceleration or rotation of a frame appears as coordinated apparent deviations of many free bodies.",
      "Galilean transformations preserve acceleration and the form of Newtonian mechanical laws between uniformly moving inertial frames. No internal mechanical experiment determines their absolute velocity.",
      "Under the same resultant force, a body with greater mass has less acceleration. This operationally expresses inertia, although mass also enters other physical theories."
    ],
    "boundary": "The first law in this form concerns inertial frames of classical mechanics; Earth is only approximately inertial in problems where effects of its rotation and orbital acceleration are negligible.",
    "example": {
      "title": "A puck after a brief push",
      "problem": "A puck is given velocity 6 m/s along +x, after which net external force is negligible. Where is it after 8 s if x(0) = 2 m?",
      "steps": [
        "Zero resultant means a = 0 in an inertial frame.",
        "Velocity therefore remains vₓ(t) = 6 m/s.",
        "Position evolves as x = x₀ + vₓt.",
        "Substitution gives x = 2 + 6×8 = 50 m."
      ],
      "answer": "After 8 s the puck is at x = 50 m if resistance is genuinely negligible.",
      "check": "Position increases by the same 6 m during every second, which is constant velocity."
    },
    "pitfall": "Zero resultant does not mean zero velocity; it means zero acceleration and therefore a constant velocity vector.",
    "practice": [
      {
        "question": "A passenger in a closed railcar moving uniformly in a straight line throws a ball vertically. Can the experiment determine the car's speed relative to Earth?",
        "hint": "Compare mechanical laws in two inertial frames.",
        "answer": "No. Neglecting vibration and air effects, the ball returns to the passenger just as in a stationary car; a mechanical experiment does not identify uniform speed relative to Earth."
      },
      {
        "question": "A body moves at (3, −4) m/s under zero resultant force for 5 s. Find its displacement.",
        "hint": "With a = 0, multiply each velocity component by time.",
        "answer": "Δr = (15, −20) m and displacement magnitude is 25 m."
      }
    ]
  },
  "3.3": {
    "topicId": "3.3",
    "question": "How does net external force determine momentum change, and under what conditions does the familiar F = ma follow?",
    "overview": [
      "Newton's second law connects the cause of motion change to the momentum derivative: ΣFext = dp/dt for a material system of fixed composition. It is a vector law, so one equation becomes independent component equations along chosen axes.",
      "When mass is constant, dp/dt = m dv/dt and ΣF = ma follows. Predicting a trajectory also requires models for the individual forces and initial conditions for position and velocity."
    ],
    "conceptExplanations": [
      "All forces exerted by objects outside the selected system are added. One large force need not cause acceleration if other forces provide an opposite sum.",
      "Momentum of a material system p = Σmᵢvᵢ changes through external force. Fixed composition excludes particles crossing the boundary and carrying an additional momentum flux.",
      "At constant inertial mass, acceleration is parallel to the resultant and inversely proportional to mass. The equation applies to the force sum, not separately to every force.",
      "Component equations ΣFₓ = maₓ and ΣFᵧ = maᵧ incorporate geometrical constraints. Component signs follow chosen axis directions, not force names.",
      "A second-order differential equation needs initial r(t₀) and v(t₀). Without them, the same force law permits a family of trajectories."
    ],
    "boundary": "The form ΣF = dp/dt requires an inertial frame and a material system of fixed composition; a rocket or jet needs a momentum-flux balance, and at relativistic speeds p is not mv.",
    "example": {
      "title": "Tension in an accelerating elevator",
      "problem": "A 60 kg load is lifted by a cable with acceleration 1.2 m/s². Find tension for g = 9.81 m/s², choosing +y upward.",
      "steps": [
        "For the load alone, external forces are tension T upward and gravity mg downward.",
        "Write the second-law component T − mg = ma.",
        "Solve T = m(g + a).",
        "Substitute T = 60×(9.81 + 1.2) = 660.6 N."
      ],
      "answer": "Cable tension is about 661 N; it exceeds mg because the resultant is upward.",
      "check": "As a → 0, the expression returns T = mg for rest or uniform motion."
    },
    "pitfall": "The term ma is not an extra force on a free-body diagram; it is the result of summing real external forces in an inertial frame.",
    "practice": [
      {
        "question": "Several nonzero forces act on a body but their sum is zero. What follows about motion?",
        "hint": "The second law determines acceleration, not velocity directly.",
        "answer": "Acceleration is zero; depending on its initial state, the body rests or moves with a constant velocity vector."
      },
      {
        "question": "A 4 kg mass experiences forces (10, 0) N and (−2, 6) N. Find acceleration.",
        "hint": "Add force components and divide by mass.",
        "answer": "ΣF = (8, 6) N, so a = (2.0, 1.5) m/s² and acceleration magnitude is 2.5 m/s²."
      }
    ]
  },
  "3.4": {
    "topicId": "3.4",
    "question": "Why do interaction forces always occur in pairs yet not cancel on a single body's diagram?",
    "overview": [
      "If body A acts on B, B simultaneously acts on A with an equal and opposite force. The forces belong to one interaction, have the same physical nature, and act on different bodies.",
      "A third-law pair does not establish equilibrium of one body because its arrows cannot be added in one equation of motion. When both bodies form one system, the pair becomes internal and cancels from the total momentum balance."
    ],
    "conceptExplanations": [
      "Pairing means F_A→B = −F_B→A in a Newtonian interaction model. A change in one force entails a simultaneous change in its partner rather than a delayed response.",
      "Earth's force on an apple acts on the apple, while the apple's force on Earth acts on Earth. Equal magnitudes are compatible with vastly different accelerations because the masses differ.",
      "While walking, a foot pushes Earth backward and Earth pushes the person forward through static friction. A swimmer and a rocket gain momentum by giving opposite momentum to water or exhaust.",
      "A horse accelerates the horse-cart system through external friction from Earth; the internal pair between horse and cart does not forbid acceleration of the whole system. Likewise, Earth moves toward a falling body but with tiny acceleration."
    ],
    "boundary": "The instantaneous paired-force form is sufficient in Newtonian mechanics; electromagnetic systems with finite propagation speed may require field momentum for a complete momentum balance.",
    "example": {
      "title": "Two skaters after a push",
      "problem": "Skaters of mass 50 and 75 kg start at rest and push apart. The first acquires +3.0 m/s. Find the second velocity, neglecting external horizontal impulse.",
      "steps": [
        "During contact, the forces are equal and opposite, so their impulses are opposite.",
        "Initial total momentum is zero and external horizontal impulse is neglected.",
        "Write 50×3.0 + 75v₂ = 0.",
        "Thus v₂ = −150/75 = −2.0 m/s."
      ],
      "answer": "The second skater moves at 2.0 m/s in the opposite direction.",
      "check": "Momenta +150 and −150 kg·m/s cancel although velocities differ."
    },
    "pitfall": "Gravity and the normal force on a resting book may be equal, but they are not a third-law pair: both act on the book and arise from different interactions.",
    "practice": [
      {
        "question": "What is the third-law partner of Earth's gravitational force on a satellite?",
        "hint": "Exchange the source and receiver of the interaction.",
        "answer": "It is the satellite's gravitational force on Earth, equal in magnitude, opposite in direction, and applied to Earth."
      },
      {
        "question": "A 3 kg body initially at rest ejects a 1 kg part backward at −6 m/s relative to Earth. Find the velocity of the remaining 2 kg when external impulse is zero.",
        "hint": "Total momentum before and after is zero.",
        "answer": "1×(−6) + 2v = 0, so the remaining part moves at +3 m/s."
      }
    ]
  },
  "3.5": {
    "topicId": "3.5",
    "question": "How are contact and elastic forces determined by constraints rather than automatically equaling familiar quantities such as mg?",
    "overview": [
      "A support, string, or spring restricts possible motion and develops force through contact or deformation. Its magnitude is normally found from equations of motion together with geometrical constraints rather than assigned in advance.",
      "Everyday apparent weight often means the scale reading, a normal force. It equals mg only without vertical acceleration; an accelerating elevator changes the reading while gravitational force mg remains nearly constant."
    ],
    "conceptExplanations": [
      "Gravitational force is the field's action on a body. A support scale reads contact force and responds to acceleration, so it is useful to distinguish mg from apparent weight N.",
      "Normal force is perpendicular to a surface and takes the value required by the no-penetration constraint while contact persists. It need not equal mg.",
      "An ideal massless inextensible string transmits equal tension along a segment when pulleys are ideal. A massive string or pulley can have different tensions.",
      "Within its linear elastic range, a spring exerts F = −kx relative to equilibrium. The constant k depends on material and geometry, and Hooke's law fails beyond the elastic regime.",
      "For connected bodies, write a separate second law and one constraint such as equal acceleration magnitudes for ends of an inextensible string. Internal tension disappears only when balancing the whole system.",
      "For upward elevator acceleration N = m(g + a); with +y upward, downward acceleration has negative a. During free fall the contact reading approaches zero."
    ],
    "boundary": "Equal tension requires a massless string and ideal pulley, while Hooke's law requires small reversible deformation; when contact is lost, normal force becomes zero and the former constraint equation no longer applies.",
    "example": {
      "title": "A scale reading in an elevator",
      "problem": "A 70 kg person stands on a scale in an elevator accelerating upward at 2.0 m/s². What force does the scale read for g = 9.81 m/s²?",
      "steps": [
        "Choose the person as the system and +y upward; N acts upward and mg downward.",
        "Write N − mg = ma.",
        "Solve N = m(g + a).",
        "Insert N = 70×(9.81 + 2.0) = 826.7 N."
      ],
      "answer": "The scale measures about 827 N, corresponding to about 84.3 kg on a mass-calibrated display that divides force by g.",
      "check": "For upward acceleration N > mg ≈ 687 N, consistent with greater apparent weight."
    },
    "pitfall": "Do not write N = mg before analyzing acceleration and other vertical forces; it is a consequence of a particular balance, not the definition of normal force.",
    "practice": [
      {
        "question": "Can normal force on a block resting on an incline be less than mg even without vertical free fall?",
        "hint": "The support balances the component perpendicular to the plane, not necessarily all of gravity.",
        "answer": "Yes. With no other perpendicular forces, N = mg cos θ, which is less than mg for a nonzero incline angle."
      },
      {
        "question": "An ideal Atwood machine has masses 3.0 and 2.0 kg. Find acceleration magnitude for g = 9.81 m/s².",
        "hint": "For the full system, driving force is the weight difference and inertial mass is the sum.",
        "answer": "a = (3−2)g/(3+2) = 1.96 m/s², with the 3 kg mass moving down."
      }
    ]
  },
  "3.6": {
    "topicId": "3.6",
    "question": "Why is there no single universal equation for friction or drag, and how is terminal speed determined?",
    "overview": [
      "Friction and drag emerge from many microscopic interactions and are described by effective models. Static friction adjusts up to a limiting value, while kinetic friction is often approximated as a constant fraction of normal force.",
      "Fluid resistance opposes velocity relative to the medium and depends on flow regime. It can be approximately linear at low Reynolds number and quadratic in inertia-dominated flow; terminal speed occurs when drag balances the driving force."
    ],
    "conceptExplanations": [
      "At rest |f_s| ≤ μ_sN: friction takes the value needed up to its maximum. After sliding begins, the simple model gives |f_k| ≈ μ_kN opposite relative motion, commonly with μ_k < μ_s.",
      "Coefficients depend on material pair, contamination, temperature, and contact regime. The μN equation is not a fundamental law and poorly represents lubrication, rolling, or adhesive contacts.",
      "Linear drag F_d = −bv describes, for example, slow viscous flow around a small sphere. Quadratic drag F_d = −½ρC_dAv|v| is more common at high Reynolds number.",
      "Terminal speed occurs when the force sum is zero and acceleration vanishes. For a falling body with quadratic drag, v_t = √(2mg/(ρC_dA)) if parameters stay constant.",
      "A skydiver's parachute increases area and changes C_d, sharply reducing terminal speed. For a car in a quadratic regime, aerodynamic power demand grows approximately as v³."
    ],
    "boundary": "Dry-friction and drag coefficients are empirical and may vary with speed, roughness, orientation, and flow regime; no universal sharp boundary separates linear and quadratic drag laws.",
    "example": {
      "title": "Falling with quadratic drag",
      "problem": "An 80 kg body falls while upward drag is modeled as kv² with k = 0.25 kg/m. Find terminal speed and downward acceleration at v = 40 m/s, taking g = 9.81 m/s².",
      "steps": [
        "At terminal fall mg = kv_t², so v_t = √(mg/k).",
        "Substitution gives v_t = √(80×9.81/0.25) ≈ 56.0 m/s.",
        "At 40 m/s, drag is kv² = 0.25×1600 = 400 N upward.",
        "Choosing downward positive, a = (mg − kv²)/m = (784.8 − 400)/80 ≈ 4.81 m/s²."
      ],
      "answer": "Terminal speed is about 56.0 m/s; at 40 m/s the body still accelerates downward at 4.81 m/s².",
      "check": "At v = 0 acceleration is g, while at v = v_t it is zero, matching the limiting cases."
    },
    "pitfall": "Static friction is not always μ_sN; that is only its upper bound, and friction takes a smaller value whenever that is sufficient to prevent sliding.",
    "practice": [
      {
        "question": "A 10 kg block on a horizontal surface is pushed with 20 N and μ_s = 0.40. It starts at rest. What is friction?",
        "hint": "Compare the required 20 N with μ_smg.",
        "answer": "The limit is about 0.40×10×9.81 = 39.2 N, so the block remains at rest and static friction is 20 N opposite the push."
      },
      {
        "question": "With quadratic drag, body area is quadrupled without changing C_d, ρ, or mass. How does terminal speed change?",
        "hint": "Area appears under a square root in the denominator of v_t.",
        "answer": "Terminal speed decreases by √4 = 2."
      }
    ]
  },
  "3.7": {
    "topicId": "3.7",
    "question": "Which real forces bend a trajectory, and how does the description change in a rotating reference frame?",
    "overview": [
      "A constraint limits allowed positions and velocities, while support or tension forces provide the required acceleration. Centripetal force is not a new interaction but a name for the inward sum of components of real forces.",
      "In a rotating frame, free bodies appear to deflect. To retain the second-law form in those coordinates, centrifugal and Coriolis inertial forces are introduced, together with an Euler force when angular velocity changes."
    ],
    "conceptExplanations": [
      "A geometrical condition such as fixed rod length relates coordinates of system parts. Constraint reaction is found by solving that condition together with equations of motion.",
      "On a turn, radial force may be supplied by friction, tension, gravity, or their sum. Adding a separate centripetal-force arrow on top of these forces would double-count the same resultant.",
      "Axes of a rotating frame change orientation relative to an inertial frame. Even a body with constant inertial velocity has an apparent acceleration in rotating coordinates.",
      "The centrifugal term points away from the rotation axis, while the Coriolis term −2mΩ×vrel is perpendicular to relative velocity. They are features of a non-inertial description, not new interactions.",
      "A Foucault pendulum's swing plane remains approximately fixed in inertial space while Earth turns beneath it. The Coriolis effect also influences large-scale atmospheric flow but does not supply its energy."
    ],
    "boundary": "Equations for a uniformly rotating frame assume a known Ω vector; changing Ω requires an Euler term, while Earth's rotation can often be neglected in small laboratory problems only after estimating the effect.",
    "example": {
      "title": "A car on a flat curve",
      "problem": "A car takes a flat curve of radius 50 m at 10 m/s. What minimum static-friction coefficient is required for g = 9.81 m/s²?",
      "steps": [
        "Required normal acceleration is a_n = v²/R = 100/50 = 2.0 m/s².",
        "On an ideal flat road, static friction f = ma_n is the only horizontal force toward the center.",
        "Maximum friction is μ_sN = μ_smg because N = mg.",
        "Condition ma_n ≤ μ_smg gives μ_s ≥ v²/(Rg) = 100/(50×9.81) ≈ 0.204."
      ],
      "answer": "The static-friction coefficient must be at least about 0.204; practical margins must allow for roughness and changing speed.",
      "check": "Mass cancels, so the ideal-model speed limit does not depend on vehicle mass."
    },
    "pitfall": "A centrifugal force must not be added to a diagram in an inertial frame alongside real forces; it is introduced only in equations using rotating coordinates.",
    "practice": [
      {
        "question": "A satellite follows a circular orbit. Which force supplies centripetal force?",
        "hint": "Look for a real interaction directed toward the orbit center.",
        "answer": "The planet's gravitational force. There is no separate additional centripetal force."
      },
      {
        "question": "A 0.50 kg ball moves in a circle of radius 2.0 m at 4.0 m/s. Find the required radial resultant.",
        "hint": "Use F_r = mv²/R.",
        "answer": "F_r = 0.50×16/2.0 = 4.0 N toward the center. Which particular force supplies it depends on the apparatus."
      }
    ]
  },
  "4.1": {
    "topicId": "4.1",
    "question": "How does a force transfer energy through displacement, and why does a large force not necessarily do large work?",
    "overview": [
      "Mechanical work measures energy transfer by a force along the actual displacement. For a constant force W = F·Δr, so only the longitudinal component contributes; a perpendicular force may redirect motion without doing work.",
      "For a variable force, work is a line integral along the path. Power describes the rate of energy transfer: average power is W/Δt and instantaneous power is P = F·v for a force on a particle."
    ],
    "conceptExplanations": [
      "For a constant force, work is FΔr cos θ. It is positive for an acute angle, negative when the force opposes displacement, and zero when they are perpendicular.",
      "Projection along an elementary displacement determines dW = F·dr. A large transverse force, such as an ideal centripetal force, does not change kinetic energy.",
      "On a graph of longitudinal force Fₓ against x, signed area is ∫Fₓdx. Regions below the axis contribute negatively, and the unit N·m is one joule.",
      "Power states how rapidly the same work is performed. In rotation, P = τ·ω is the analogue of P = F·v."
    ],
    "boundary": "Work depends on the reference frame and on the path of the point of application. For a constant force vector, W = F·Δr depends only on the total displacement regardless of path shape; a varying force requires the integral ∫F·dr.",
    "example": {
      "title": "Work by a variable force",
      "problem": "A force along an axis is Fₓ = 2x N with x in meters. A body moves from x = 0 to x = 3 m in 2 s. Find work and average power.",
      "steps": [
        "Write W = ∫₀³Fₓdx = ∫₀³2x dx.",
        "Integration gives W = [x²]₀³ = 9 J.",
        "Average power is P̄ = W/Δt.",
        "Thus P̄ = 9/2 = 4.5 W."
      ],
      "answer": "The force does 9 J of work and average power over the interval is 4.5 W.",
      "check": "The triangular area under the graph, with base 3 m and height 6 N, is ½×3×6 = 9 J."
    },
    "pitfall": "Work is not the product of arbitrary magnitudes F and s but a dot product; normal force does no work during horizontal displacement even when it is large.",
    "practice": [
      {
        "question": "Does ideal string tension do work on a body in uniform circular motion?",
        "hint": "Compare tension direction with instantaneous velocity.",
        "answer": "No. Tension is radial and velocity tangential, so F·v = 0 and kinetic energy remains constant."
      },
      {
        "question": "A hoist steadily raises a load with 500 N through 2.0 m in 4.0 s. Find work and average power.",
        "hint": "Force and displacement are aligned.",
        "answer": "W = 500×2.0 = 1000 J and P̄ = 1000/4.0 = 250 W."
      }
    ]
  },
  "4.2": {
    "topicId": "4.2",
    "question": "How can net work determine a speed change without reconstructing every instant of motion?",
    "overview": [
      "In nonrelativistic mechanics, particle kinetic energy is K = mv²/2. The work-energy theorem states that work by the resultant force along a path equals the change in K, regardless of how individual forces share that work.",
      "The theorem is especially useful when force depends on position and time is not needed. It connects two states, but work signs and kinetic-energy values belong to the selected inertial frame."
    ],
    "conceptExplanations": [
      "K is a scalar and grows with speed squared: doubling speed at fixed mass multiplies energy by four. Its zero depends on the frame in which the body rests.",
      "Newton's law gives dK = Fres·dr. Positive net work increases speed, negative net work decreases it, and zero net work preserves speed even if direction changes.",
      "With an approximately constant braking force, stopping distance is proportional to v₀². A modest percentage increase in speed therefore causes a larger increase in minimum braking distance.",
      "Velocity, point-of-application displacement, and work change between inertial frames. Wres = ΔK remains true when every quantity is evaluated in the same frame."
    ],
    "boundary": "K = mv²/2 requires constant mass and v ≪ c; an extended rotating body has additional rotational energy, while relativistic motion uses K = (γ−1)mc².",
    "example": {
      "title": "Stopping distance under constant force",
      "problem": "A 1000 kg car travels at 20 m/s. A constant 5000 N resultant braking force opposes motion. Find stopping distance.",
      "steps": [
        "Initial kinetic energy is K₀ = ½×1000×20² = 200000 J.",
        "After stopping K₁ = 0, so ΔK = −200000 J.",
        "Constant braking force along the straight path does W = −Fs.",
        "From −5000s = −200000 obtain s = 40 m."
      ],
      "answer": "Ideal braking distance is 40 m; driver reaction distance and variable grip are excluded.",
      "check": "Doubling initial speed would quadruple energy and distance under the same force."
    },
    "pitfall": "Work by one selected force generally does not equal kinetic-energy change; the theorem uses net work by all forces on the body.",
    "practice": [
      {
        "question": "Can a nonzero force act continuously without changing kinetic energy?",
        "hint": "Consider a force perpendicular to velocity.",
        "answer": "Yes. In uniform circular motion a radial force redirects velocity but F·v = 0 and K stays constant."
      },
      {
        "question": "A 2.0 kg body speeds up from 3.0 to 7.0 m/s. Find net work.",
        "hint": "Use ΔK = m(v₂²−v₁²)/2.",
        "answer": "Wres = ½×2.0×(49−9) = 40 J."
      }
    ]
  },
  "4.3": {
    "topicId": "4.3",
    "question": "When can an interaction be represented by potential energy, and how does its landscape determine force direction?",
    "overview": [
      "For a conservative interaction, work between two configurations is path independent. Potential energy U can then be defined so that force work is −ΔU and spatial force points against the gradient: F = −∇U.",
      "The absolute zero of U is arbitrary; differences and derivatives are observable. A minimum of the potential landscape is a stable equilibrium when a small displacement produces a restoring force."
    ],
    "conceptExplanations": [
      "Equivalent tests of conservativeness in a simply connected region are zero work around a closed path and path-independent work. Sliding friction fails these tests.",
      "Near Earth's surface with constant g, U_g = mgy is convenient; for an ideal spring U_s = kx²/2. Both belong to specific approximations.",
      "Replacing U with U + C leaves ΔU and the gradient unchanged, so forces and motion are unchanged. Choose the zero for computational convenience.",
      "At equilibrium, the derivative of U along each allowed coordinate is zero. A positive second derivative gives a local minimum and stability against small displacements.",
      "In one dimension Fₓ = −dU/dx: if U rises to the right, force points left. A steep landscape means a large force magnitude, not a high body speed."
    ],
    "boundary": "One scalar potential describes only the conservative part of an interaction; friction and velocity-dependent forces need separate treatment, and U = mgy is valid only in a nearly uniform field.",
    "example": {
      "title": "Spring energy and force",
      "problem": "A spring with k = 200 N/m is stretched to x = +0.10 m from equilibrium. Find potential energy and force with +x along the stretch.",
      "steps": [
        "Use U(x) = kx²/2 with zero at x = 0.",
        "Then U = ½×200×0.10² = 1.0 J.",
        "Differentiate: Fₓ = −dU/dx = −kx.",
        "At x = +0.10 m, Fₓ = −20 N, toward equilibrium."
      ],
      "answer": "Potential energy is 1.0 J and force is 20 N in the −x direction.",
      "check": "Changing x to −x leaves energy unchanged but reverses force so that it again points toward the minimum."
    },
    "pitfall": "Force is minus the slope of U, not the slope itself; omitting the sign predicts motion uphill in potential rather than restoration toward a minimum.",
    "practice": [
      {
        "question": "Why does adding 100 J to every potential-energy value not change motion?",
        "hint": "Compare differences and derivatives before and after the shift.",
        "answer": "The constant cancels in ΔU and has zero gradient, leaving work and force unchanged."
      },
      {
        "question": "For U(x) = 3x² J with x in meters, find Fₓ at x = −2 m.",
        "hint": "Calculate −dU/dx.",
        "answer": "dU/dx = 6x N, so Fₓ = −6x = +12 N at x = −2 m."
      }
    ]
  },
  "4.4": {
    "topicId": "4.4",
    "question": "How should a system boundary be chosen so that vanished mechanical energy reappears as transfer or conversion rather than a failure of conservation?",
    "overview": [
      "A selected system's total energy remains constant when no energy crosses its boundary, but can move among kinetic, potential, internal, and other forms. With exchange, stored energy changes by net transfer through work, heating, and matter flow.",
      "Mechanical energy K + U is conserved only when accounted forces are conservative. Friction reduces K + U but normally raises internal energy of bodies and surroundings; an energy-flow diagram makes the complete balance visible."
    ],
    "conceptExplanations": [
      "Closure is relative to a kind of exchange: a system may be closed to matter yet receive electrical energy. Draw the boundary before writing a balance.",
      "Energy forms are terms in one balance, not substances that disappear. The most useful decomposition can depend on the descriptive scale.",
      "During sliding, macroscopic mechanical energy becomes microscopic deformation and thermal motion. Dissipation means loss of an available ordered form, not destruction of energy.",
      "Efficiency η = Euseful/Ein cannot exceed one for a consistent boundary and interval. It does not identify the remaining energy until a full balance is made.",
      "A Sankey diagram uses flow width for powers or energies. Outgoing branches must sum to input after accounting for storage change inside the system."
    ],
    "boundary": "Conservation of total energy neither guarantees conservation of mechanical energy nor determines process direction; an incomplete inventory of forms or transfers creates an apparent imbalance.",
    "example": {
      "title": "Speed after a frictionless descent",
      "problem": "A cart starts from rest at height 5.0 m and descends without losses. Find bottom speed for g = 9.81 m/s².",
      "steps": [
        "Choose the cart-Earth system so gravitational potential energy is internal to the balance.",
        "Without dissipation K₀ + U₀ = K₁ + U₁.",
        "Set U₁ = 0 and K₀ = 0: mgh = mv²/2.",
        "Mass cancels and v = √(2gh) = √(2×9.81×5.0) ≈ 9.90 m/s."
      ],
      "answer": "Ideal bottom speed is about 9.90 m/s; real losses would make it smaller.",
      "check": "The speed has the same scale as free fall through 5 m because the energy balance is identical."
    },
    "pitfall": "The statement 'energy was lost to friction' is incomplete; enlarge the system and show increased internal energy and transfer to the surroundings.",
    "practice": [
      {
        "question": "Why does a ball's mechanical energy decrease after an inelastic impact without violating energy conservation?",
        "hint": "Include deformation, sound, and thermal motion.",
        "answer": "Some ordered kinetic energy becomes internal energy of ball and surface and leaves in sound waves; total energy of the enlarged system is conserved."
      },
      {
        "question": "A motor receives 500 J and delivers 350 J of useful energy. Find efficiency and the other energy transfer.",
        "hint": "Use η = Euseful/Ein and a complete balance.",
        "answer": "η = 350/500 = 0.70 = 70%. The remaining 150 J enters other forms or the surroundings."
      }
    ]
  },
  "4.5": {
    "topicId": "4.5",
    "question": "Why can a short large force and a long small force produce the same change of motion?",
    "overview": [
      "Momentum p = mv combines mass with vector velocity. Newton's law gives momentum change as net impulse J = ∫Fdt, so area under a force-time graph matters rather than peak force alone.",
      "A system's total momentum changes through external impulse. Internal forces redistribute momentum among parts, but when external impulse is zero the vector sum is conserved and recoil follows."
    ],
    "conceptExplanations": [
      "Momentum points with velocity and has unit kg·m/s. At equal speed, a more massive body requires a larger impulse to stop.",
      "J = Δp is exact for resultant force. Mean force over an interval is Fmean = Δp/Δt, but it does not reproduce the shape of a short force peak.",
      "If external impulse is negligible, Pbefore = Pafter. This vector law applies component by component; kinetic energy may still change.",
      "In recoil, two parts receive opposite momentum changes. Rocket motion is a continuous transfer of momentum in expelled mass."
    ],
    "boundary": "The expression p = mv is nonrelativistic, and momentum conservation requires all momentum carriers plus a check of external impulse; electromagnetic field momentum may be part of the system.",
    "example": {
      "title": "Mean force during a ball rebound",
      "problem": "A 0.15 kg ball travels at 20 m/s along +x and rebounds at 15 m/s along −x. Contact lasts 0.010 s. Find momentum change and mean resultant force.",
      "steps": [
        "Initial momentum is p_i = 0.15×20 = +3.00 kg·m/s.",
        "Final momentum is p_f = 0.15×(−15) = −2.25 kg·m/s.",
        "The change is Δp = p_f − p_i = −5.25 kg·m/s.",
        "Mean force is Fmean = Δp/Δt = −5.25/0.010 = −525 N."
      ],
      "answer": "Momentum changes by −5.25 kg·m/s and mean resultant force is −525 N, opposite the initial motion.",
      "check": "Reversal requires changing momentum by the sum of magnitudes 3.00 + 2.25 = 5.25 kg·m/s."
    },
    "pitfall": "Do not subtract speed magnitudes during a rebound: final velocity has the opposite sign, making momentum change larger than for a simple stop.",
    "practice": [
      {
        "question": "Why does an airbag reduce mean force on a passenger for the same velocity change?",
        "hint": "Relate fixed Δp to interaction duration.",
        "answer": "It lengthens stopping time, so |Fmean| = |Δp|/Δt decreases. Peak force also depends on the time-profile shape."
      },
      {
        "question": "A 4 kg cart at rest ejects a 1 kg load at +6 m/s relative to the ground. Find the remaining 3 kg cart velocity when external impulse is zero.",
        "hint": "Initial total momentum is zero.",
        "answer": "1×6 + 3v = 0, so v = −2 m/s."
      }
    ]
  },
  "4.6": {
    "topicId": "4.6",
    "question": "Which quantities survive a collision, and why can a rocket not be analyzed as a constant-mass body?",
    "overview": [
      "During a short collision, external impulse is often negligible, so total system momentum is conserved. Kinetic energy is conserved only in an elastic collision; in an inelastic collision some becomes internal energy, with sticking giving the largest loss for fixed initial momenta.",
      "The center of mass moves as if total mass were concentrated there and acted on by net external force. A rocket changes mass and transfers momentum to exhaust, so its correct balance includes mass flux through the boundary."
    ],
    "conceptExplanations": [
      "An elastic collision conserves momentum and total kinetic energy; an inelastic collision conserves isolated-system momentum but not kinetic energy.",
      "P conservation follows from zero external impulse. Internal deformation can increase internal energy, so Kbefore = Kafter needs a separate physical condition.",
      "Center-of-mass position is R = Σmᵢrᵢ/M and M d²R/dt² = Fext for a fixed particle set. Internal motion does not alter this law.",
      "If the system is the remaining rocket alone, combustion products cross its boundary and carry momentum. Changing mass is not itself an external force.",
      "Differentiating mv for changing composition without a flux term mixes momentum of different particle sets. Apply a balance to rocket plus a small fuel parcel over the same interval.",
      "For an ideal rocket with no external force and constant effective exhaust speed u_e, Δv = u_e ln(m₀/m_f). Exhaust speed is measured relative to the rocket."
    ],
    "boundary": "The elementary Tsiolkovsky equation neglects gravity and drag during the burn, assumes constant exhaust speed, and compares initial and final masses; real maneuvers integrate external forces and variable thrust.",
    "example": {
      "title": "A perfectly inelastic collision",
      "problem": "A 2.0 kg body moving at 3.0 m/s sticks to a stationary 1.0 kg body. Find their common speed and kinetic-energy change.",
      "steps": [
        "With negligible external impulse, conserve momentum: 2×3 + 1×0 = (2+1)v.",
        "The common speed is v = 2.0 m/s in the first body's direction.",
        "Initial energy is K_i = ½×2×3² = 9 J.",
        "Final energy is K_f = ½×3×2² = 6 J; 3 J enters internal and other forms."
      ],
      "answer": "The joined bodies move at 2.0 m/s and kinetic energy decreases by 3 J.",
      "check": "Final momentum 3×2 = 6 kg·m/s equals initial momentum although K is not conserved."
    },
    "pitfall": "Do not impose both momentum and kinetic-energy conservation on every collision; the second equality holds only for an elastic collision.",
    "practice": [
      {
        "question": "How does center-of-mass velocity change during an internal collision when external force is zero?",
        "hint": "Apply the center-of-mass law to the full system.",
        "answer": "It does not change; center-of-mass velocity remains constant while individual velocities can change abruptly."
      },
      {
        "question": "An ideal rocket has u_e = 3000 m/s and mass ratio m₀/m_f = e. Find ideal velocity increment.",
        "hint": "ln e = 1.",
        "answer": "Δv = u_e ln(m₀/m_f) = 3000 m/s, excluding gravity and aerodynamic losses."
      }
    ]
  },
  "4.7": {
    "topicId": "4.7",
    "question": "How does mass distribution control rotational response, and why does rolling contain two kinds of motion?",
    "overview": [
      "Rotation about a fixed axis is described by angle, angular velocity, and angular acceleration just as translation uses position, velocity, and acceleration. The analogue of mass is moment of inertia I = ∫r²dm, which weights mass by distance from the axis.",
      "Rotational energy is Iω²/2. In rolling without slipping, the center of mass translates, the body rotates about it, and v_cm = ωR links the two motions."
    ],
    "conceptExplanations": [
      "Angular variables satisfy α = dω/dt and ω = dφ/dt. Constant-α equations parallel constant-acceleration kinematics when angle is in radians.",
      "Equal masses can have different I: moving mass farther from the axis increases its contribution as r². The parallel-axis theorem gives I = I_cm + Md².",
      "Rotational energy depends on chosen axis and angular velocity. General rigid-body motion can be split as K = Mv_cm²/2 + I_cmω²/2.",
      "Without slipping, the contact point is instantaneously at rest relative to the surface and v_cm = ωR. Static friction may enforce this condition without doing work at a stationary contact point."
    ],
    "boundary": "A rigid-body model needs negligible deformation and v_cm = ωR needs no slip; moment of inertia belongs to a specified axis and is not one universal number for a body.",
    "example": {
      "title": "A solid cylinder rolling downhill",
      "problem": "A solid cylinder starts from rest and rolls without slipping through height 1.20 m. Find center-of-mass speed at the bottom for I_cm = MR²/2 and g = 9.81 m/s².",
      "steps": [
        "Conserve mechanical energy: Mgh = Mv²/2 + I_cmω²/2.",
        "Use I_cm = MR²/2 and ω = v/R.",
        "Then Mgh = Mv²/2 + Mv²/4 = 3Mv²/4.",
        "Thus v = √(4gh/3) = √(4×9.81×1.20/3) ≈ 3.96 m/s."
      ],
      "answer": "Cylinder-center speed is about 3.96 m/s in the ideal no-loss, no-slip model.",
      "check": "It is below √(2gh) ≈ 4.85 m/s for a nonrotating sliding point because some energy is rotational."
    },
    "pitfall": "Do not assign all Mgh to Mv²/2 for a rolling body; rotational kinetic energy is generally nonzero.",
    "practice": [
      {
        "question": "Two rings of equal mass rotate at equal ω, but one has a larger radius. Which has more energy?",
        "hint": "For a thin ring I = MR².",
        "answer": "The larger ring, because K = MR²ω²/2 grows as R²."
      },
      {
        "question": "A wheel of radius 0.30 m rolls without slipping at ω = 10 rad/s. Find center speed.",
        "hint": "Use v_cm = ωR.",
        "answer": "v_cm = 10×0.30 = 3.0 m/s."
      }
    ]
  },
  "4.8": {
    "topicId": "4.8",
    "question": "How does torque change angular momentum, and why does the choice of origin matter for both?",
    "overview": [
      "Torque τ = r×F measures an external force's ability to alter rotation about a chosen origin. External torque is the time derivative of total system angular momentum, so L is conserved when that torque vanishes.",
      "For a particle L = r×p and system contributions are summed. For a rigid body about a fixed principal axis, L = Iω often applies, but in general L and ω need not be parallel, which underlies precession."
    ],
    "conceptExplanations": [
      "Torque magnitude is force times perpendicular distance to its line of action. A force whose line passes through the origin has zero torque about that origin.",
      "Static rigid-body equilibrium requires both ΣF = 0 and Στ = 0. Zero net force with nonzero torque still permits angular acceleration.",
      "A particle's orbital angular momentum depends on r and the selected origin. Every contribution to a system sum must use the same origin and inertial frame.",
      "If total external torque about the selected origin is zero, total L is conserved. Internal forces can redistribute it among parts and kinds of rotation.",
      "A rapidly spinning rotor with large L changes direction gradually under torque, producing precession. This realizes rather than violates dL/dt = τ.",
      "The link between continuous rotational symmetry and angular-momentum conservation is formalized by Noether's theorem; it requires invariant dynamics, not merely a round object."
    ],
    "boundary": "The simple L = Iω relation applies to rotation about a principal axis; torque and angular momentum must use one origin fixed in an inertial frame unless additional transport terms are included.",
    "example": {
      "title": "A skater changes moment of inertia",
      "problem": "A skater rotates under negligible external torque with I₁ = 4.0 kg·m² and ω₁ = 2.0 rad/s, then pulls in their arms to I₂ = 2.0 kg·m². Find new angular speed and energy change.",
      "steps": [
        "With zero external torque, L = Iω is conserved.",
        "Initial L = 4.0×2.0 = 8.0 kg·m²/s.",
        "New speed is ω₂ = L/I₂ = 8.0/2.0 = 4.0 rad/s.",
        "K₁ = I₁ω₁²/2 = 8 J and K₂ = I₂ω₂²/2 = 16 J."
      ],
      "answer": "Angular speed doubles to 4.0 rad/s and rotational energy rises by 8 J through muscular work.",
      "check": "Angular momentum remains 8.0 kg·m²/s in both states; energy need not be separately conserved."
    },
    "pitfall": "Angular-momentum conservation does not mean constant angular velocity: changing mass distribution changes I and is compensated by ω.",
    "practice": [
      {
        "question": "Why is a door handle placed far from its hinges?",
        "hint": "Compare force lever arms for the same effort.",
        "answer": "A larger perpendicular lever arm gives greater torque τ = r⊥F, so less force produces the same rotational effect."
      },
      {
        "question": "A particle has r = (2, 0, 0) m and p = (0, 3, 0) kg·m/s. Find L about the origin.",
        "hint": "Calculate r×p and apply the right-hand rule.",
        "answer": "L = (0, 0, 6) kg·m²/s, directed along +z."
      }
    ]
  },
  "5.1": {
    "topicId": "5.1",
    "question": "How does one Newtonian law connect mutual attraction, a field in space, and acceleration near a planet's surface?",
    "overview": [
      "A point mass M creates gravitational field g = −GMr/r³ directed toward the source. Another mass m experiences F = mg; its own mass cancels from free-fall acceleration when no other forces act.",
      "Fields from several sources add vectorially, while potentials add as scalars. With zero at infinity, point-mass potential is φ = −GM/r, pair potential energy is U = mφ, and the field is recovered through g = −∇φ."
    ],
    "conceptExplanations": [
      "Force magnitude between point masses is Gm₁m₂/r², and forces lie along their connecting line as a third-law pair. Outside a spherically symmetric body, the same equation applies with mass at the center.",
      "Superposition adds each source field at one point with direction. It works in Newtonian theory because the field equation is linear in mass density.",
      "Potential is energy per unit test mass and is normally negative when zero is at infinity. A potential difference determines path-independent work in a stationary gravitational field.",
      "At the surface of a spherical planet g = GM/R². Over height small relative to R, g changes little, so a constant field and U ≈ mgh are useful approximations."
    ],
    "boundary": "The Newtonian expression is accurate for pointlike or nonoverlapping spherical bodies in weak fields at low speeds; a nonspherical interior requires density integration, while strong gravity requires general relativity.",
    "example": {
      "title": "Surface gravity from Earth's M and R",
      "problem": "Estimate g for spherical Earth with M = 5.972×10²⁴ kg and R = 6.371×10⁶ m, using G = 6.6743×10⁻¹¹ m³/(kg·s²).",
      "steps": [
        "Use g = GM/R² at the surface of a spherical mass.",
        "The numerator GM ≈ 3.986×10¹⁴ m³/s².",
        "The denominator R² ≈ 4.059×10¹³ m².",
        "Their ratio gives g ≈ 9.82 m/s²."
      ],
      "answer": "The spherical model gives g ≈ 9.82 m/s², close to standard 9.80665 m/s²; local values vary with rotation, latitude, altitude, and mass distribution.",
      "check": "Dimensions of GM/R² are (m³/(kg·s²))×kg/m² = m/s²."
    },
    "pitfall": "A negative potential with zero at infinity does not imply a negative force; field direction comes from the gradient, while the sign of U describes binding relative to the chosen zero.",
    "practice": [
      {
        "question": "Why do two different test masses have the same acceleration in one gravitational field?",
        "hint": "Insert F = mg into ma = F.",
        "answer": "Inertial mass in ma and gravitational mass in mg cancel to give a = g when drag and other forces are negligible."
      },
      {
        "question": "How much weaker is a spherical planet's field at distance 2R from its center than at surface R?",
        "hint": "Outside the sphere the field falls as 1/r².",
        "answer": "g(2R)/g(R) = R²/(2R)² = 1/4, so it is four times weaker."
      }
    ]
  },
  "5.2": {
    "topicId": "5.2",
    "question": "Why does a planet move faster near its star, and how does ellipse size determine orbital period?",
    "overview": [
      "An isolated Newtonian two-body problem reduces to motion of the relative position vector in a central field. A bound path is an ellipse with the attraction center at a focus; a circle is its special case.",
      "A central force has zero torque, so angular momentum and areal velocity are constant: the radius vector sweeps equal areas in equal times. The third law connects period to the relative orbit semimajor axis: T² = 4π²a³/[G(M+m)]."
    ],
    "conceptExplanations": [
      "With negative total energy the relative orbit is an ellipse; with zero energy it is parabolic, and with positive energy hyperbolic. Both masses actually move about their common center of mass.",
      "A small sector area is one half the magnitude of r×v times dt. Angular-momentum conservation keeps this sweep rate constant and requires faster motion at periapsis.",
      "The semimajor axis a belongs to relative separation. The sum M+m matters when the orbiting body's mass is not negligible relative to the central body.",
      "Tangential velocity prevents a direct fall toward the center: gravity continuously bends the trajectory and turns free fall into orbital motion."
    ],
    "boundary": "Kepler's laws in this exact form assume an isolated Newtonian problem of two pointlike or spherical bodies; other-body perturbations, nonsphericity, drag, and relativistic corrections produce precession and evolving elements.",
    "example": {
      "title": "Period of Earth's orbit",
      "problem": "Estimate Earth's nearly circular period for a = 1.496×10¹¹ m and GM☉ = 1.3271244×10²⁰ m³/s², neglecting Earth mass in the denominator.",
      "steps": [
        "Write T = 2π√(a³/GM☉).",
        "Calculate a³ ≈ 3.349×10³³ m³.",
        "The ratio a³/GM☉ ≈ 2.524×10¹³ s² and its square root is about 5.024×10⁶ s.",
        "Multiplying by 2π gives T ≈ 3.157×10⁷ s ≈ 365.3 days."
      ],
      "answer": "The period is about 365.3 days, consistent with an Earth year within rounding and the two-body approximation.",
      "check": "a³/(GM) has dimension s², so its square root is a time."
    },
    "pitfall": "The star occupies an ellipse focus, not its geometric center; placing it at the center destroys the speed relation implied by equal areas.",
    "practice": [
      {
        "question": "Where is speed greater on an elliptical orbit, at periapsis or apoapsis?",
        "hint": "Equal sectors are swept in equal times while radius differs.",
        "answer": "At periapsis: a smaller radius requires greater transverse speed to keep areal velocity constant."
      },
      {
        "question": "Semimajor axis increases by a factor of 4 around the same central mass. How does period change?",
        "hint": "Use T ∝ a³ᐟ².",
        "answer": "Period increases by 4³ᐟ² = 8."
      }
    ]
  },
  "5.3": {
    "topicId": "5.3",
    "question": "How does the sign of orbital energy separate bound and escaping paths, and what does a brief impulse do to an orbit?",
    "overview": [
      "Specific mechanical energy in a Newtonian field is ε = v²/2 − μ/r, where μ = GM. A bound ellipse has ε < 0 and ε = −μ/(2a); zero energy is the parabolic escape boundary and positive energy gives a hyperbola.",
      "Circular speed at radius r is √(μ/r), while no-further-thrust escape speed is √(2μ/r). A brief impulse changes velocity but not instantaneous position; its direction sets new energy, angular momentum, and the opposite apsis."
    ],
    "conceptExplanations": [
      "A circular orbit has constant radius and speed, while an ellipse exchanges kinetic and potential energy at fixed total. The vis-viva equation v² = μ(2/r − 1/a) covers both.",
      "First cosmic speed in idealized usage is circular speed at the surface, and second cosmic speed is surface escape speed. They depend on the planet and are not universal constants.",
      "Negative ε gives a finite apoapsis, ε = 0 reaches infinity with zero residual speed, and ε > 0 retains excess speed. The actual path may intersect the surface first.",
      "A prograde impulse on a circular orbit normally raises apoapsis and leaves the burn point as new periapsis; a retrograde impulse lowers the opposite side. A radial impulse also rotates the ellipse."
    ],
    "boundary": "Surface cosmic speeds omit atmosphere, rotation, terrain, and finite burn time; one-μ equations assume a spherical central body with no important perturbations.",
    "example": {
      "title": "Circular and escape speeds near Earth",
      "problem": "Estimate both speeds at Earth radius R = 6.371×10⁶ m with μ = 3.986×10¹⁴ m³/s², ignoring atmosphere and rotation.",
      "steps": [
        "Circular speed is v_c = √(μ/R).",
        "Substitution gives v_c ≈ √(6.257×10⁷) ≈ 7.91 km/s.",
        "Escape speed is v_esc = √(2μ/R) = √2 v_c.",
        "Thus v_esc ≈ 11.19 km/s."
      ],
      "answer": "Ideal surface values are about 7.91 km/s circular speed and 11.19 km/s escape speed.",
      "check": "The ratio v_esc/v_c = √2 ≈ 1.414 is independent of M and r at the same point in a Newtonian field."
    },
    "pitfall": "A speed below escape speed does not guarantee an orbit: an unsuitable direction may make the path intersect the planet, and an atmosphere dissipates energy.",
    "practice": [
      {
        "question": "What happens to the far side of a circular orbit after a brief prograde impulse?",
        "hint": "At the burn point energy and tangential speed rise while position has not changed yet.",
        "answer": "The burn point becomes periapsis of a new ellipse and the opposite apoapsis rises, provided escape speed is not reached."
      },
      {
        "question": "Find circular speed at r = 7.0×10⁶ m from Earth's center for μ = 3.986×10¹⁴ m³/s².",
        "hint": "Use v_c = √(μ/r).",
        "answer": "v_c = √(3.986×10¹⁴ / 7.0×10⁶) ≈ 7546 m/s ≈ 7.55 km/s."
      }
    ]
  },
  "5.4": {
    "topicId": "5.4",
    "question": "Why does an extended body experience tides while nearly in free fall, and how does rotation create special equilibrium points?",
    "overview": [
      "A tide is caused not by gravitational field alone but by its difference across an extended body. In a frame falling with the center, common acceleration disappears while the field gradient stretches the body along the source direction and compresses it transversely.",
      "Tidal torques can synchronize spin with mean orbital motion. In a frame rotating with two primary bodies, gravitational and inertial terms produce five Lagrange points where a small third body can remain fixed in the ideal restricted problem."
    ],
    "conceptExplanations": [
      "A point-mass field changes approximately as 1/r², so near and far sides have different accelerations. For body size R ≪ r, the longitudinal difference has scale 2GMR/r³.",
      "Tidal force is what remains after center-of-mass acceleration is subtracted. It depends on body size and orientation and can deform oceans, satellites, and stars.",
      "Synchronous rotation means spin period equals orbital period; at low eccentricity and obliquity one hemisphere remains toward the partner. Tidal dissipation and capture maintain the state.",
      "The Roche limit estimates where tidal stretching can overcome a satellite's self-gravity. Its coefficient depends on densities, rigidity, rotation, and whether the body is treated as fluid or rigid.",
      "L₁, L₂, and L₃ are collinear and generally unstable without corrections; L₄ and L₅ form equilateral configurations and can be stable at a sufficiently small mass ratio in the circular restricted problem."
    ],
    "boundary": "The tidal estimate 2GMR/r³ requires R ≪ r and a point source, while elementary Roche limits and Lagrange points belong to ideal circular, planar, restricted models without extra bodies or nongravitational forces.",
    "example": {
      "title": "Scale of lunar tidal acceleration across Earth",
      "problem": "Estimate the Moon's acceleration difference from Earth's center to near edge using 2μₘRₑ/r³, with μₘ = 4.9049×10¹² m³/s², Rₑ = 6.371×10⁶ m, and r = 3.844×10⁸ m.",
      "steps": [
        "Use the first-order field-gradient estimate because Rₑ/r ≈ 0.0166 ≪ 1.",
        "The numerator 2μₘRₑ ≈ 6.250×10¹⁹ m⁴/s².",
        "The denominator r³ ≈ 5.682×10²⁵ m³.",
        "Their ratio is about 1.10×10⁻⁶ m/s²."
      ],
      "answer": "The characteristic longitudinal tidal acceleration from center to near side is about 1.1 μm/s², far below g but acting coherently across Earth.",
      "check": "Tides fall as 1/r³, faster than field strength 1/r², explaining their strong distance sensitivity."
    },
    "pitfall": "Tides are not explained only by stronger attraction on the near side; subtract center acceleration and include relative stretching of the far side in the opposite direction.",
    "practice": [
      {
        "question": "Does synchronous rotation mean a satellite does not rotate about its own axis?",
        "hint": "Track its orientation relative to distant stars over one orbit.",
        "answer": "No. It turns once about its axis per orbital period, which keeps one hemisphere facing the planet."
      },
      {
        "question": "By what factor does a point-source tide decrease when distance doubles at fixed body size?",
        "hint": "The tidal scale is proportional to 1/r³.",
        "answer": "It decreases by 2³ = 8."
      }
    ]
  },
  "5.5": {
    "topicId": "5.5",
    "question": "Why does adding a third gravitating body qualitatively complicate prediction, and how can a numerical orbit be validated?",
    "overview": [
      "In the two-body problem, center-of-mass motion separates and relative motion has enough conserved quantities for an analytic conic-section description. With three or more mutually interacting bodies, every acceleration depends on all changing separations, and no general elementary closed-form solution exists.",
      "Many-body paths may be regular, resonant, quasiperiodic, or chaotic. A numerical integrator advances positions and velocities step by step; quality is checked through convergence under step reduction and drift in energy, momentum, and angular momentum."
    ],
    "conceptExplanations": [
      "For two bodies, internal forces are central, the center of mass moves uniformly, and the relative coordinate is equivalent to one particle with reduced mass. This separation makes the problem integrable.",
      "A third massive body perturbs both original orbits, which then alter its motion in return. This nonlinear feedback cannot be reduced to two independent fixed two-body solutions.",
      "Some configurations are protected by resonances and persist, others exchange energy slowly, while chaotic ones exponentially amplify small initial differences. Chaos does not mean absence of deterministic equations.",
      "Integrators differ in accuracy and preservation of geometric structure. Symplectic methods often control long-term energy drift, while close encounters need a small adaptive step or regularization."
    ],
    "boundary": "Numerical predictability is limited by initial-condition uncertainty, the body model, and accumulated error; agreement of one run does not guarantee a long-term trajectory in a chaotic regime.",
    "example": {
      "title": "Center of mass as a three-body integration check",
      "problem": "Three bodies of mass 1, 2, and 3 kg have x = 0, 2, and 5 m and velocities vₓ = 1, 0, and −1 m/s. No external force acts. Where must their center of mass be after 6 s regardless of internal forces?",
      "steps": [
        "Total mass is M = 1 + 2 + 3 = 6 kg.",
        "Initial X_cm = (1×0 + 2×2 + 3×5)/6 = 19/6 m.",
        "Total Pₓ = 1×1 + 2×0 + 3×(−1) = −2 kg·m/s, so V_cm = −2/6 = −1/3 m/s.",
        "With no external force, X_cm(6) = 19/6 + (−1/3)×6 = 7/6 m ≈ 1.17 m."
      ],
      "answer": "After 6 s the center of mass must be at x = 7/6 m ≈ 1.17 m; a significant numerical deviation reveals an integration or force error.",
      "check": "Internal gravitational forces cancel pairwise in the total momentum equation even when individual paths are complicated."
    },
    "pitfall": "A small trajectory change over one step does not establish long-term accuracy; phase error and invariant drift can accumulate over thousands of orbits.",
    "practice": [
      {
        "question": "Why is a chaotic orbit not random in the same sense as an independent coin toss?",
        "hint": "Separate determinism of the law from practical predictability.",
        "answer": "It obeys deterministic equations but exponentially amplifies small initial differences, so finite input precision creates a limited prediction horizon."
      },
      {
        "question": "An isolated system has total momentum 12 kg·m/s and total mass 30 kg. How does its center of mass move?",
        "hint": "Use V_cm = P/M.",
        "answer": "The center of mass moves uniformly at 12/30 = 0.40 m/s in the total-momentum direction."
      }
    ]
  },
  "6.1": {
    "topicId": "6.1",
    "question": "Why can matter made of discrete atoms often be described by continuous fields of density, pressure, and temperature?",
    "overview": [
      "A state of matter is determined by the balance between thermal motion, interactions among particles, and external conditions rather than by the substance name alone. A solid preserves long-range or local structural order, a liquid flows while remaining nearly fixed in volume, a gas fills the available volume, and a plasma contains enough free charges to respond collectively to electromagnetic fields.",
      "A macroscopic description averages over a huge number of particles inside a small physical region. If its linear size still spans many particles but remains much smaller than the scale over which the flow changes, fields such as $\\rho(\\mathbf r,t)$, $p(\\mathbf r,t)$, and $T(\\mathbf r,t)$ can be defined. The continuum approximation becomes unreliable when the mean free path or a microstructural size is comparable to the problem scale."
    ],
    "conceptExplanations": [
      "The states differ through their ability to preserve shape and volume, the character of particle order, and the presence of mobile charge carriers; a phase diagram locates transitions under specified conditions.",
      "Density $\\rho = dm/dV$ measures mass in a local volume, whereas pressure p is normal force per unit area; in an equilibrium medium both can be assigned at every point.",
      "Temperature, pressure, and viscosity are not properties of a single molecule in the same sense as they are properties of a system; they emerge after statistical averaging of microscopic motion and collisions.",
      "A practical criterion is a small Knudsen number $\\mathrm{Kn} = \\lambda/L$, where $\\lambda$ is the mean free path and L is the characteristic scale of macroscopic variation."
    ],
    "boundary": "A continuum model requires Kn much less than 1 and local thermodynamic equilibrium; a rarefied gas, nanoscopic channel, shock front, or granular medium may require a kinetic or discrete description.",
    "example": {
      "title": "Testing the continuum approximation for air",
      "problem": "The molecular mean free path in air is 70 nm and the characteristic channel width is 1.0 mm. Estimate the Knudsen number and decide whether ordinary fluid mechanics is suitable away from the walls.",
      "steps": [
        "Convert to SI units: $\\lambda = 7.0 \\times 10^{-8}\\,\\mathrm{m}$ and $L = 1.0 \\times 10^{-3}\\,\\mathrm{m}$.",
        "Calculate $\\mathrm{Kn} = \\lambda/L = 7.0 \\times 10^{-5}$.",
        "This is much less than 0.01, so collisions rapidly restore local equilibrium and the bulk flow can be treated as a continuum."
      ],
      "answer": "$\\mathrm{Kn} = 7.0 \\times 10^{-5}$; the continuum model is appropriate for the bulk flow.",
      "check": "Kn is dimensionless and decreases for a wider channel; a separate boundary condition may still be needed immediately next to a wall."
    },
    "pitfall": "A plasma is not merely a very hot ideal gas: even a modest ionized fraction can produce collective behavior through long-range fields and introduce new length and time scales.",
    "practice": [
      {
        "question": "Why cannot pressure be assigned to one selected gas molecule?",
        "hint": "Compare one instantaneous molecular impulse with an averaged momentum flux through an area.",
        "answer": "Pressure is the statistical mean normal momentum flux of many particles per unit area; one molecular path supplies only isolated impulses."
      },
      {
        "question": "A gas has $\\lambda = 20\\,\\mu\\mathrm{m}$ in a channel 0.20 mm wide. Find Kn and assess the model.",
        "hint": "Put both lengths in metres and divide $\\lambda$ by L.",
        "answer": "$\\mathrm{Kn} = 0.10$. This is a transition regime, so conventional continuum fluid mechanics without slip corrections is unreliable."
      }
    ]
  },
  "6.2": {
    "topicId": "6.2",
    "question": "How can an applied load predict reversible deformation, and how can we tell when the linear material model has failed?",
    "overview": [
      "A load creates stresses inside a body, while its geometric response is described by strains. For uniaxial tension, the mean normal stress is $F/A$ and the longitudinal strain is $\\Delta L/L_0$. These quantities remove the direct effect of specimen size and allow tests of different parts to be compared.",
      "Within a small elastic range, many materials approximately obey Hooke's law, $\\sigma = E \\varepsilon$. Elastic strain vanishes after unloading, whereas plastic strain leaves a permanent change of shape. Real strength is not fixed by one tabulated limit: holes, cracks, cyclic loading, and material heterogeneity amplify local stresses."
    ],
    "conceptExplanations": [
      "Stress is internal force per area and is generally a tensor, while strain measures relative changes of lengths and angles; the simple scalars $\\sigma$ and $\\varepsilon$ belong to a uniaxial test.",
      "An elastic regime permits recovery of the original shape, whereas a plastic regime involves irreversible structural rearrangement; the transition is identified on a stress-strain curve.",
      "Young's modulus E is the slope of the linear portion of that curve: a large E means little elastic strain at a given stress, but it does not by itself imply high strength.",
      "Shear changes angles, bending stretches one side and compresses the other, and torsion produces a shear-stress distribution that depends on cross-sectional geometry.",
      "Fatigue permits crack growth under repeated loads below a static limit, and a sharp notch raises the local stress above the average $F/A$."
    ],
    "boundary": "The relation $\\sigma = E \\varepsilon$ describes small uniaxial elastic strain in a homogeneous material; it does not replace a tensor model, a plasticity law, a fracture criterion, or a buckling analysis for a slender member.",
    "example": {
      "title": "Extension of a steel rod",
      "problem": "A rod 2.0 m long with cross-sectional area 400 mm^2 carries a tensile force of 20 kN. Take $E = 200\\,\\mathrm{GPa}$ and yield stress 250 MPa. Find the stress and elastic extension.",
      "steps": [
        "Convert the data: $A = 4.00 \\times 10^{-4}\\,\\mathrm{m^2}$, $F = 2.0 \\times 10^{4}\\,\\mathrm{N}$, and $E = 2.00 \\times 10^{11}\\,\\mathrm{Pa}$.",
        "The mean stress is $\\sigma = F/A = 5.0 \\times 10^{7}\\,\\mathrm{Pa} = 50\\,\\mathrm{MPa}$, below the stated yield stress.",
        "The strain is $\\varepsilon = \\sigma/E = 2.5 \\times 10^{-4}$.",
        "The extension is $\\Delta L = \\varepsilon L_{0} = 5.0 \\times 10^{-4}\\,\\mathrm{m} = 0.50\\,\\mathrm{mm}$."
      ],
      "answer": "$\\sigma = 50\\,\\mathrm{MPa}$ and $\\Delta L = 0.50\\,\\mathrm{mm}$; under the stated assumptions the deformation is elastic.",
      "check": "The relative extension is only 0.025%, and $F/A$ has units of pascals. The calculation does not assess notches, fatigue, or buckling."
    },
    "pitfall": "A high Young's modulus does not imply a high strength: stiffness is the slope of the elastic curve, whereas yielding and fracture are separate properties.",
    "practice": [
      {
        "question": "Why is a hole in a stretched plate more dangerous than the average stress $F/A$ suggests?",
        "hint": "Consider how load paths bend around the edge of the hole.",
        "answer": "The stress field is nonuniform near the hole and its local maximum exceeds the average; cracks therefore tend to initiate at the edge."
      },
      {
        "question": "A 1.5 m wire has $E = 70\\,\\mathrm{GPa}$ and a stress of 140 MPa within its linear range. Find its extension.",
        "hint": "First use $\\varepsilon = \\sigma/E$ and then $\\Delta L = \\varepsilon L_{0}$.",
        "answer": "$\\varepsilon = 0.002$, so $\\Delta L = 0.003\\,\\mathrm{m} = 3.0\\,\\mathrm{mm}$."
      }
    ]
  },
  "6.3": {
    "topicId": "6.3",
    "question": "How does the pressure distribution in a stationary liquid determine the force and orientational stability of an immersed body?",
    "overview": [
      "A fluid at rest has no shear stress, and pressure acts normal to every surface. Balancing a small volume in a uniform gravitational field gives $dp/dz = -\\rho g$: pressure increases downward. A pressure difference, rather than atmospheric pressure by itself, creates a net hydrostatic force.",
      "Integrating pressure over an immersed surface produces the buoyant force, equal to the weight of displaced fluid. A floating body settles at an immersed volume for which buoyancy equals its weight. Orientational stability also depends on the lines of action of weight and buoyancy, not only on equality of their magnitudes."
    ],
    "conceptExplanations": [
      "For a liquid of constant density, $p = p_{0} + \\rho g h$; points at equal height in one connected stationary liquid have equal pressure.",
      "An externally applied pressure increment is transmitted through an enclosed liquid, so an ideal hydraulic press changes force in the area ratio while conserving work.",
      "Buoyancy points opposite to effective gravity and has magnitude $\\rho_{\\mathrm{fluid}}gV_{\\mathrm{displaced}}$; it arises because lower parts of the surface experience greater pressure.",
      "Floating equilibrium requires $F_{\\mathrm{b}} = mg$, and a small tilt must produce a restoring torque; the metacentre relative to the centre of mass supplies a small-angle stability criterion."
    ],
    "boundary": "Hydrostatic relations require a fluid at rest in the chosen frame and a known effective gravity field; accelerated flow, appreciable compressibility, or dominant capillary forces require more than $p = p_{0} + \\rho gh$.",
    "example": {
      "title": "Immersed fraction of a floating block",
      "problem": "A uniform block of volume 0.020 m^3 and mass 12 kg floats freely in water of density 1000 kg/m^3. Find the displaced volume and the fraction below water.",
      "steps": [
        "At equilibrium, weight mg equals buoyancy $\\rho gV_{\\mathrm{sub}}$.",
        "Cancel g to obtain $V_{\\mathrm{sub}} = m/\\rho = 12/1000 = 0.012\\,\\mathrm{m^3}$.",
        "The immersed fraction is $V_{\\mathrm{sub}}/V = 0.012/0.020 = 0.60$."
      ],
      "answer": "The block displaces 0.012 m^3 of water and has 60% of its volume submerged.",
      "check": "Its mean density is 600 kg/m^3, below that of water, so partial flotation is possible; g cancels as expected."
    },
    "pitfall": "Buoyancy need not equal an object's weight: that equality holds only for vertical equilibrium of a freely floating object with no additional vertical forces.",
    "practice": [
      {
        "question": "Why is pressure at a vessel bottom not determined uniquely by the total mass of liquid?",
        "hint": "Compare $p = p_{0} + \\rho gh$ for differently shaped vessels having the same depth.",
        "answer": "Local pressure depends on depth, density, and surface pressure; vessel walls may carry part of the liquid weight, and bottom force also depends on bottom area."
      },
      {
        "question": "What is the gauge pressure 5.0 m below the surface of fresh water? Take $g = 9.81\\,\\mathrm{m/s^2}$.",
        "hint": "Use $\\Delta p = \\rho gh$ with $\\rho = 1000\\,\\mathrm{kg/m^3}$.",
        "answer": "$\\Delta p = 4.905 \\times 10^{4}\\,\\mathrm{Pa}$, approximately 49 kPa."
      }
    ]
  },
  "6.4": {
    "topicId": "6.4",
    "question": "Why does a liquid surface tend to reduce its area, and how does that tendency produce droplets, menisci, and capillary rise?",
    "overview": [
      "A molecule inside a liquid is surrounded on all sides, whereas the environment of a surface molecule is asymmetric. Creating a new interface requires work, so at fixed conditions the free surface energy changes as $dW = \\gamma dA$. The same coefficient $\\gamma$ describes tangential force per unit length along a line in the interface.",
      "Surface curvature creates a pressure jump, and the competition among surface energy, gravity, and contact with a solid determines shape. In a narrow capillary, the vertical component of surface tension can support a liquid column. The effect strengthens rapidly as size decreases because surface force scales with length while weight scales with volume."
    ],
    "conceptExplanations": [
      "The coefficient $\\gamma$ is reversible work per unit increase of area at specified temperature and composition; contaminants and temperature can change it substantially.",
      "Without gravity, a droplet of fixed volume approaches a sphere, the minimum-area shape; when weight matters, the capillary length controls the deformation.",
      "The equilibrium contact angle is measured through the liquid where three interfaces meet; an angle below 90 degrees indicates preferential wetting but depends on material and surface cleanliness.",
      "For a thin circular capillary, $h = 2 \\gamma \\cos(\\theta)/(\\rho g r)$; the sign of $\\cos\\theta$ determines a rise or depression.",
      "The ratio of surface force to weight grows approximately as $1/L^2$ as size falls, allowing a water strider to be supported by an interface while the same mechanism cannot support a large animal."
    ],
    "boundary": "Elementary formulas assume an equilibrium clean interface, constant $\\gamma$, a specified contact angle, and a cylindrical tube; dynamic wetting, evaporation, contamination, and contact-angle hysteresis require additional modeling.",
    "example": {
      "title": "Water rise in a glass capillary",
      "problem": "For water, $\\gamma = 0.072\\,\\mathrm{N/m}$ and $\\rho = 1000\\,\\mathrm{kg/m^3}$; take the contact angle as zero. Find the rise in a capillary of radius 0.50 mm with $g = 9.81\\,\\mathrm{m/s^2}$.",
      "steps": [
        "Use $h = 2 \\gamma \\cos(\\theta)/(\\rho g r)$.",
        "Convert the radius: $r = 5.0 \\times 10^{-4}\\,\\mathrm{m}$, and $\\cos(0) = 1$.",
        "Substitution gives $h = 0.144/(1000 \\times 9.81 \\times 5.0 \\times 10^{-4}) = 2.94 \\times 10^{-2}\\,\\mathrm{m}$."
      ],
      "answer": "The ideal model predicts a rise of about 2.9 cm.",
      "check": "The result has units of length and is inversely proportional to radius; a tube half as wide would predict twice the rise."
    },
    "pitfall": "Surface tension is not a literal skin stretched over the liquid: it is a thermodynamic property of an interface, with forces acting along any line drawn in that interface.",
    "practice": [
      {
        "question": "Why is a small drop closer to spherical than a large drop of the same liquid on a horizontal surface?",
        "hint": "Compare the scaling of surface energy and gravitational energy with size.",
        "answer": "At small size the surface contribution is larger relative to weight, so area minimization dominates; gravity flattens a larger drop more strongly."
      },
      {
        "question": "By what factor does capillary height change if tube radius increases from 0.25 to 1.0 mm with all other parameters fixed?",
        "hint": "The formula gives h proportional to 1/r.",
        "answer": "The radius increases by a factor of 4, so the height decreases by a factor of 4."
      }
    ]
  },
  "6.5": {
    "topicId": "6.5",
    "question": "How do conservation laws and viscosity connect pipe geometry with flow speed, pressure, and flow regime?",
    "overview": [
      "For steady flow, mass conservation requires the same mass flow rate through successive sections. For an incompressible liquid this becomes $A v_{\\mathrm{mean}}=\\mathrm{constant}$, so a constriction increases the mean speed. In ideal inviscid flow, $p+\\rho v^2/2+\\rho gz$ remains constant along a streamline and expresses mechanical energy per unit volume.",
      "A real fluid dissipates mechanical energy through viscosity and interacts with a wall through the no-slip condition. The Reynolds number $\\mathrm{Re} = \\rho v L/\\mu$ compares inertial and viscous effects, although its critical value depends on geometry and disturbances. Turbulent flow adds fluctuations and eddy transport of momentum to the mean motion."
    ],
    "conceptExplanations": [
      "Volume flow rate $Q = dV/dt$ is the integral of velocity over a cross-section; $Q = A v_{\\mathrm{mean}}$ uses its area average, and Q is conserved in steady incompressible flow.",
      "Bernoulli's equation is an energy integral for steady inviscid flow; pumps, turbines, and head loss require additional terms.",
      "Dynamic viscosity $\\mu$ relates shear stress to velocity gradient in a Newtonian fluid; in a long round pipe, laminar flow rate is particularly sensitive to radius.",
      "Re is not a speed by itself: equal Reynolds numbers describe a similar inertia-to-viscosity balance in geometrically similar problems.",
      "A boundary layer is the region of rapid velocity change near a surface; its separation changes drag and can create a broad wake."
    ],
    "boundary": "$Q=A\\bar v$ defines volume flow through one cross-section without requiring steady flow; equal flow rates through sections of a rigid impermeable streamtube follow from incompressibility. The stated form of Bernoulli's equation additionally assumes steady flow and negligible viscous loss along the selected streamline; high-Mach-number gases and non-Newtonian fluids require other equations of state or constitutive laws.",
    "example": {
      "title": "A constriction in a water pipe",
      "problem": "A horizontal pipe narrows from diameter 4.0 cm to 2.0 cm. Upstream water speed is 1.0 m/s, $\\rho = 1000\\,\\mathrm{kg/m^3}$, and $\\mu = 1.0 \\times 10^{-3}\\,\\mathrm{Pa\\cdot s}$. Find the ideal downstream speed and pressure drop, then estimate Re downstream.",
      "steps": [
        "Area is proportional to $D^2$, so $A_{1}/A_{2} = 4$ and continuity gives $v_{2} = 4.0\\,\\mathrm{m/s}$.",
        "For ideal horizontal flow, $p_{1} - p_{2} = \\rho(v_{2}^2 - v_{1}^2)/2 = 7.5 \\times 10^{3}\\,\\mathrm{Pa}$.",
        "The downstream Reynolds number is $\\mathrm{Re} = \\rho v_{2} D_{2}/\\mu = 8.0 \\times 10^{4}$.",
        "This Re suggests a likely turbulent real flow, so the actual pressure drop exceeds the ideal value because of loss."
      ],
      "answer": "$v_{2} = 4.0\\,\\mathrm{m/s}$, ideal $p_{1} - p_{2} = 7.5\\,\\mathrm{kPa}$, and $\\mathrm{Re} = 8.0 \\times 10^{4}$; the final result flags the limitation of the ideal calculation.",
      "check": "Speed rises inversely with area and static pressure falls; energy is not destroyed, but real flow converts some mechanical energy into internal energy."
    },
    "pitfall": "The phrase 'higher speed means lower pressure' is not a universal local law; it follows from Bernoulli only when suitable points on a flow are compared with height, devices, and losses accounted for.",
    "practice": [
      {
        "question": "Why is the velocity of an ordinary viscous fluid at a stationary wall usually taken to equal the wall velocity?",
        "hint": "Name the standard boundary condition for a viscous fluid.",
        "answer": "The no-slip condition gives zero relative velocity at the solid wall, producing a velocity gradient and shear stress."
      },
      {
        "question": "In incompressible flow, area decreases from 30 to 10 cm^2 while speed is 0.50 m/s in the wider section. Find the narrower-section speed.",
        "hint": "Use $A_{1} v_{1} = A_{2} v_{2}$.",
        "answer": "$v_{2} = (30/10) \\times 0.50 = 1.5\\,\\mathrm{m/s}$."
      }
    ]
  },
  "7.1": {
    "topicId": "7.1",
    "question": "Why do many different systems oscillate almost sinusoidally near stable equilibrium?",
    "overview": [
      "At stable equilibrium, a small displacement produces a force directed back toward equilibrium. If potential energy is smooth, its first nonzero term near a minimum is usually quadratic, making the restoring force linear in displacement. The equation $m \\ddot{x} + kx = 0$ then has sinusoidal solutions.",
      "Amplitude and initial phase are fixed by the initial state, while the natural angular frequency $\\omega_{0} = \\sqrt{k/m}$ is fixed by system parameters. The same mathematical form describes a spring, a small-angle pendulum, and many electrical or acoustic systems, but only while nonlinearity and loss remain negligible."
    ],
    "conceptExplanations": [
      "Stable equilibrium corresponds to a local minimum of potential energy: after a small displacement, the system accelerates back toward the equilibrium point.",
      "Amplitude is the maximum displacement, period T is the repeat time, $f = 1/T$, $\\omega = 2 \\pi f$, and phase specifies the location within a cycle.",
      "For an ideal spring $F = -kx$, so mass and stiffness determine $\\omega_0$; leaving the linear Hooke-law range creates harmonics and an amplitude-dependent period.",
      "The exact pendulum equation contains $\\sin\\theta$; replacing it by $\\theta$ is valid only for a small angle expressed in radians and makes the equation linear.",
      "A point moving uniformly around a circle has coordinate $A\\cos(\\omega t+\\varphi)$ on a selected axis, geometrically explaining the sine and cosine solution."
    ],
    "boundary": "The ideal harmonic-oscillator model requires a linear restoring force, constant parameters, and negligible loss; large pendulum angles, a nonlinear spring, or dry friction change both waveform and period.",
    "example": {
      "title": "Frequency of a mass on a spring",
      "problem": "A 0.50 kg mass is attached to a spring of stiffness 200 N/m. Neglect loss. Find its natural angular frequency, period, and frequency.",
      "steps": [
        "Calculate $\\omega_{0} = \\sqrt{k/m} = \\sqrt{200/0.50} = 20\\,\\mathrm{rad/s}$.",
        "The period is $T = 2 \\pi/\\omega_{0} = 0.314\\,\\mathrm{s}$.",
        "The frequency is $f = 1/T = 3.18\\,\\mathrm{Hz}$."
      ],
      "answer": "$\\omega_{0} = 20\\,\\mathrm{rad/s}$, $T = 0.314\\,\\mathrm{s}$, and $f = 3.18\\,\\mathrm{Hz}$.",
      "check": "$k/m$ has units of 1/s^2; increasing mass must reduce frequency, as the square root predicts."
    },
    "pitfall": "A small angle is not merely a small number of degrees: $\\theta$ must be in radians when using $\\sin\\theta$ approximately equal to $\\theta$.",
    "practice": [
      {
        "question": "Does the period of an ideal spring oscillator change if amplitude is doubled within the linear range?",
        "hint": "Check whether A appears in $\\omega_{0} = \\sqrt{k/m}$.",
        "answer": "No. The ideal linear period is amplitude-independent; a measured dependence indicates nonlinearity or another violated assumption."
      },
      {
        "question": "By what factor does period change if mass is quadrupled while the spring is unchanged?",
        "hint": "T is proportional to $\\sqrt{m/k}$.",
        "answer": "The period increases by $\\sqrt{4} = 2$."
      }
    ]
  },
  "7.2": {
    "topicId": "7.2",
    "question": "What does a phase trajectory reveal about oscillator state that a single animation frame cannot?",
    "overview": [
      "One coordinate is insufficient for a one-dimensional oscillator: at the same position the body may move right or left. The pair (x,v) specifies its instantaneous state and fixes subsequent motion when the law is known. A plot of v against x is a phase trajectory.",
      "For an ideal harmonic oscillator, $E = mv^2/2 + kx^2/2$ is constant, so the phase trajectory is a closed ellipse. Loss contracts the trajectory toward equilibrium, driving can sustain a limit cycle, and different regions of phase space reveal qualitatively distinct regimes without watching a long animation."
    ],
    "conceptExplanations": [
      "At turning points, speed and kinetic energy vanish while potential energy is maximal; at the equilibrium crossing, speed and kinetic energy are maximal.",
      "The sign of velocity distinguishes two states with the same coordinate, so the pair (x,v) removes the ambiguity of a position snapshot.",
      "Each point on the phase curve is a state and time sets its direction; two trajectories cannot cross for a deterministic autonomous equation with a unique solution.",
      "A phase portrait immediately displays equilibria, stability, closed oscillation, decay, and regions of different motion even when time traces look complicated."
    ],
    "boundary": "The two-dimensional plane (x,v) is complete only for one coordinate governed by a second-order equation; a driven system also needs driving phase, and a multidimensional system needs additional coordinates and momenta.",
    "example": {
      "title": "Speed from a phase ellipse",
      "problem": "An oscillator has amplitude $A = 0.080\\,\\mathrm{m}$ and $\\omega_{0} = 5.0\\,\\mathrm{rad/s}$. What is its speed magnitude at $x = 0.048\\,\\mathrm{m}$? Neglect loss.",
      "steps": [
        "From $x = A \\cos(\\varphi)$ and $v = -A \\omega_{0} \\sin(\\varphi)$, obtain $(x/A)^2 + (v/(A \\omega_{0}))^2 = 1$.",
        "Therefore $|v| = \\omega_{0} \\sqrt{A^2 - x^2}$.",
        "Substitution gives $|v| = 5.0 \\sqrt{0.080^2 - 0.048^2} = 0.32\\,\\mathrm{m/s}$."
      ],
      "answer": "The speed magnitude is 0.32 m/s; its sign depends on direction around the phase trajectory.",
      "check": "At $x = 0$ the speed would be $A \\omega_{0} = 0.40\\,\\mathrm{m/s}$, so this result is correctly below the maximum."
    },
    "pitfall": "A phase trajectory is not the body's path in ordinary space: its axes carry different quantities, such as metres and metres per second.",
    "practice": [
      {
        "question": "How can a phase portrait distinguish ideal oscillation from damped oscillation?",
        "hint": "Track whether the closed curve keeps the same size with time.",
        "answer": "An ideal oscillator follows a closed curve of constant size, while a damped oscillator spirals toward stable equilibrium."
      },
      {
        "question": "For $A = 0.10\\,\\mathrm{m}$ and $\\omega_{0} = 4\\,\\mathrm{rad/s}$, find the maximum speed.",
        "hint": "Maximum speed occurs at $x = 0$.",
        "answer": "$v_{\\mathrm{max}} = A \\omega_{0} = 0.40\\,\\mathrm{m/s}$."
      }
    ]
  },
  "7.3": {
    "topicId": "7.3",
    "question": "Why can a weak periodic drive produce a large response at one frequency and almost no response at another?",
    "overview": [
      "Drag or internal friction removes mechanical energy, so free oscillation decays. A periodic external force returns energy. After transients disappear, the system responds at the driving frequency, with an amplitude and phase lag that depend on frequency and damping.",
      "Near the natural frequency, energy transfer per cycle is especially effective and resonance occurs. Damping limits the peak and broadens the resonance curve. The quality factor Q measures resonance sharpness and the ratio of stored energy to loss per cycle; periodically changing a system parameter can instead produce parametric resonance."
    ],
    "conceptExplanations": [
      "A dissipative force does negative work on average, converting organized mechanical motion into internal energy of the system and surroundings.",
      "In steady linear response, the oscillator moves at the drive frequency even though its amplitude is controlled by proximity to a natural frequency.",
      "Resonance is a frequency-selective response, not always unlimited growth: finite damping gives a finite amplitude, and the precise peak frequency depends slightly on what is measured.",
      "For a weakly damped isolated resonance, Q is approximately $f_0/\\Delta f$, where $\\Delta f$ is the full width between half-power points.",
      "Parametric excitation varies a parameter such as pendulum length or stiffness; a strong response can occur when the modulation is near twice the natural frequency."
    ],
    "boundary": "A single resonance curve and $Q = f_{0}/\\Delta f$ assume a linear oscillator, weak damping, sinusoidal stationary drive, and steady state; nonlinearity may shift the resonance, create jumps, and permit multiple stable responses.",
    "example": {
      "title": "Quality factor from resonance width",
      "problem": "A resonator has its power maximum at 50 Hz, with half-power points at 47 and 53 Hz. Estimate its quality factor.",
      "steps": [
        "The bandwidth is $\\Delta f = 53 - 47 = 6\\,\\mathrm{Hz}$.",
        "For weak damping, use $Q = f_{0}/\\Delta f$.",
        "Thus $Q = 50/6 = 8.3$."
      ],
      "answer": "The estimated quality factor is Q ≈ 8.3, corresponding to a comparatively broad resonance peak.",
      "check": "Q is dimensionless; this moderate value is consistent with a visibly broad resonance."
    },
    "pitfall": "Resonance is not merely equality of any two frequencies: the drive must couple to the relevant mode and transfer energy, while loss controls the outcome.",
    "practice": [
      {
        "question": "Why does stronger damping lower and broaden a resonance peak?",
        "hint": "Compare energy supplied and energy lost during each cycle.",
        "answer": "Greater loss prevents energy from accumulating to a large amplitude and reduces frequency selectivity, so the peak is lower and the bandwidth wider."
      },
      {
        "question": "A resonator has $f_{0} = 1.2\\,\\mathrm{kHz}$ and $Q = 60$. Estimate its half-power bandwidth.",
        "hint": "Rearrange $Q = f_{0}/\\Delta f$.",
        "answer": "$\\Delta f = 1200/60 = 20\\,\\mathrm{Hz}$."
      }
    ]
  },
  "7.4": {
    "topicId": "7.4",
    "question": "How does local interaction between neighboring parts of a medium carry a disturbance and energy without transporting matter as a whole?",
    "overview": [
      "A wave forms when a local displacement creates forces or fluxes that affect a neighboring region while inertia delays its response. Material elements usually oscillate around their positions as disturbance phase and energy propagate. For a harmonic traveling wave, the same phase repeats after wavelength $\\lambda$ in space and period T in time.",
      "The relation $v_{\\mathrm{ph}} = f \\lambda$ follows because the profile advances one wavelength during one period. The wave equation connects the second time derivative to spatial curvature. At a boundary, continuity conditions create reflected and transmitted waves; a speed change alters wavelength while frequency from a stationary source remains fixed."
    ],
    "conceptExplanations": [
      "Material elements may have zero mean displacement over a cycle while energy crosses a surface; mass transport and propagation of a wave pattern are different processes.",
      "In a longitudinal wave displacement is parallel to propagation, while in a transverse wave it is perpendicular; the classification concerns the disturbance vector.",
      "Frequency counts cycles per second, $\\lambda$ is the spatial period, and phase velocity tracks a point of constant phase.",
      "For a stretched string, curvature produces a transverse resultant force and element mass supplies inertia; their balance gives $\\frac{\\partial^2y}{\\partial t^2} = v^2 \\frac{\\partial^2y}{\\partial x^2}$.",
      "At reflection and refraction from a stationary boundary, frequency is conserved while amplitude, phase, direction, and wavelength may change."
    ],
    "boundary": "The relation $v_{\\mathrm{ph}} = f \\lambda$ describes a monochromatic traveling wave in a specified frame; the simple linear wave equation requires small disturbances and fixed medium parameters, while a dispersive medium has frequency-dependent speed.",
    "example": {
      "title": "Wavelength and propagation time",
      "problem": "A harmonic wave of frequency 120 Hz travels through a nondispersive medium at 15 m/s. Find its wavelength and the time for a disturbance to travel 20 m.",
      "steps": [
        "From $v = f \\lambda$, $\\lambda = v/f = 15/120 = 0.125\\,\\mathrm{m}$.",
        "In this nondispersive model the signal and phase speeds coincide, so $t = L/v = 20/15 = 1.33\\,\\mathrm{s}$.",
        "Distinguish the established-wave period $T = 1/f = 8.33\\,\\mathrm{ms}$ from propagation time to the distant point."
      ],
      "answer": "$\\lambda = 0.125\\,\\mathrm{m}$ and the travel time over 20 m is 1.33 s.",
      "check": "$f\\lambda$ has units m/s; in one 8.33 ms period the wave moves 0.125 m."
    },
    "pitfall": "Particle speed in the medium is generally not wave speed: the former is the time derivative of local displacement, while the latter tracks phase or an envelope.",
    "practice": [
      {
        "question": "What happens to frequency and wavelength when a wave crosses a stationary boundary into a slower medium?",
        "hint": "Phase on both sides of the boundary must remain synchronized in time.",
        "answer": "Frequency remains fixed and wavelength decreases in proportion to phase speed."
      },
      {
        "question": "A wave has $\\lambda = 0.80\\,\\mathrm{m}$ and $f = 2.5\\,\\mathrm{Hz}$. Find phase speed.",
        "hint": "Use $v = f \\lambda$.",
        "answer": "$v = 2.0\\,\\mathrm{m/s}$."
      }
    ]
  },
  "7.5": {
    "topicId": "7.5",
    "question": "How does linear wave addition create stationary nodes and a discrete set of resonant frequencies?",
    "overview": [
      "In a linear medium, the sum of two wave-equation solutions is also a solution. Displacements therefore add with their signs and phases: equal phases reinforce, while opposite phases can cancel. Interference redistributes amplitude in space but does not destroy the energy of the entire closed system.",
      "Two opposing harmonic waves of equal frequency and amplitude form a standing wave. Its nodes remain fixed while antinodes oscillate between them. Boundary conditions admit only wavelengths that fit the system geometry, so a string, air column, or resonator has discrete normal modes."
    ],
    "conceptExplanations": [
      "Superposition applies when the medium response is linear: total displacement is the algebraic sum of separate displacements at the same point and time.",
      "Constructive and destructive behavior is set by phase difference; complete cancellation requires equal amplitudes and opposite phases at the point considered.",
      "A standing wave can have zero average energy flux although each segment between nodes exchanges kinetic and potential energy.",
      "A fixed string end requires zero displacement, so $L = n \\lambda/2$ and $f_{\\mathrm{n}} = n v/(2L)$; another boundary type gives a different mode set."
    ],
    "boundary": "Linear superposition and ideal-string mode formulas require small transverse displacement, constant tension and linear density, fixed ideal boundaries, and weak loss; string stiffness and compliant supports shift the frequencies.",
    "example": {
      "title": "Modes of a stretched string",
      "problem": "A 0.65 m string is fixed at both ends, held at tension 80 N, and has linear density $5.0 \\times 10^{-3}\\,\\mathrm{kg/m}$. Find its first and third natural frequencies.",
      "steps": [
        "The transverse wave speed is $v = \\sqrt{T/\\mu} = \\sqrt{80/0.005} = 126.5\\,\\mathrm{m/s}$.",
        "The fundamental is $f_{1} = v/(2L) = 126.5/1.30 = 97.3\\,\\mathrm{Hz}$.",
        "For an ideal string, $f_n=nf_1$, so $f_{3} = 292\\,\\mathrm{Hz}$."
      ],
      "answer": "$f_1$ is about 97 Hz and $f_3$ is about 292 Hz.",
      "check": "Three half-wavelengths fit along the string in the third mode; increasing tension raises every frequency as $\\sqrt T$."
    },
    "pitfall": "Destructive interference at one point does not mean energy vanished: it remains elsewhere or in another form if no absorption occurs.",
    "practice": [
      {
        "question": "Why is a fixed string end a node?",
        "hint": "What kinematic boundary condition does the support impose?",
        "answer": "The support forbids transverse displacement, so incident and reflected waves must always sum to zero there."
      },
      {
        "question": "How does $f_1$ change if ideal-string tension is increased by a factor of 9?",
        "hint": "$f_1$ is proportional to $\\sqrt T$.",
        "answer": "The fundamental frequency increases by a factor of 3."
      }
    ]
  },
  "7.6": {
    "topicId": "7.6",
    "question": "How does a harmonic spectrum explain signal shape, and why does a wave packet change shape in a dispersive medium?",
    "overview": [
      "A Fourier transform represents a suitable signal as a sum of sinusoids with different frequencies, amplitudes, and phases. A time representation shows when a signal changes, whereas a spectrum shows its frequency scales. A short pulse necessarily occupies a broad frequency range.",
      "If the dispersion relation $\\omega(k)$ is nonlinear, harmonic components propagate with different phase velocities. The phase of one component moves at $v_{\\mathrm{ph}} = \\omega/k$, while the maximum of a narrowband envelope moves approximately at $v_{\\mathrm{g}} = d\\omega/dk$. Variation of velocity across the band makes the packet spread."
    ],
    "conceptExplanations": [
      "Harmonics form a basis for linear analysis: their sums reproduce periodic waveforms and, with a suitable continuous spectrum, localized pulses.",
      "A spectrum contains amplitude and phase at each frequency; its magnitude alone is not generally enough to reconstruct the time waveform.",
      "Phase velocity tracks a crest of one harmonic and group velocity tracks the slow envelope of a narrow frequency group; neither may be identified with information speed without checking conditions.",
      "Curvature of $\\omega(k)$ makes different spectrum components accumulate different phases, changing packet duration and shape even without absorption."
    ],
    "boundary": "Interpreting $v_{\\mathrm{g}} = d\\omega/dk$ as packet speed requires a narrow spectrum and slowly varying medium; near strong absorption or resonance, group velocity need not equal energy or signal-front velocity.",
    "example": {
      "title": "Phase and group velocities",
      "problem": "In a model medium, dispersion is $\\omega = a k^2$ with $a = 0.50\\,\\mathrm{m^2/s}$. Find phase and group velocities at $k_{0} = 4.0\\,\\mathrm{m^{-1}}$.",
      "steps": [
        "Phase velocity is $v_{\\mathrm{ph}} = \\omega/k = a k$.",
        "At $k_{0} = 4.0\\,\\mathrm{m^{-1}}$, $v_{\\mathrm{ph}} = 0.50 \\times 4.0 = 2.0\\,\\mathrm{m/s}$.",
        "Group velocity is $v_{\\mathrm{g}} = d\\omega/dk = 2ak = 4.0\\,\\mathrm{m/s}$."
      ],
      "answer": "$v_{\\mathrm{ph}} = 2.0\\,\\mathrm{m/s}$ and $v_{\\mathrm{g}} = 4.0\\,\\mathrm{m/s}$.",
      "check": "a k has units m/s, and unequal velocities confirm dispersion."
    },
    "pitfall": "A large spectral amplitude does not reveal when that component occurred; time localization also requires phase and a specified observation window.",
    "practice": [
      {
        "question": "Why can a very short pulse not be constructed from a single frequency?",
        "hint": "One harmonic extends through all time and is strictly periodic.",
        "answer": "Localization comes from interference among many frequencies; the shorter the pulse scale, the broader the required bandwidth."
      },
      {
        "question": "For the nondispersive relation $\\omega = c k$, find $v_{\\mathrm{ph}}$ and $v_{\\mathrm g}$.",
        "hint": "Divide $\\omega$ by k and differentiate it with respect to k.",
        "answer": "Both velocities equal c, so an ideal packet does not spread through dispersion."
      }
    ]
  },
  "7.7": {
    "topicId": "7.7",
    "question": "How do pressure oscillations become perceived sound, and why do the source, room, and motion change what is heard?",
    "overview": [
      "Sound in a liquid or gas is mainly a longitudinal wave of alternating compression and rarefaction. Pressure and particle velocity oscillate around equilibrium values, while mean intensity describes energy flux. Frequency strongly affects perceived pitch, but loudness depends on level, spectrum, and hearing sensitivity.",
      "Timbre is determined by harmonic content and temporal envelope. Instruments excite normal modes of strings, membranes, or air columns, while a room adds reflections and reverberation. Relative motion changes wavefront arrival frequency through the Doppler effect; a supersonic source forms a shock cone."
    ],
    "conceptExplanations": [
      "Acoustic pressure is a small departure from background pressure; in a linear plane wave it is related to particle velocity by the medium's acoustic impedance.",
      "Pitch correlates mainly with frequency, loudness with perceived level, and timbre distinguishes equal notes through spectrum and attack.",
      "Boundary conditions select instrument resonances, but the real sound also includes excitation, coupling to a body, radiation, and mode-dependent damping.",
      "Reverberation is the statistically decaying tail of many reflections; too little makes sound dry, while too much reduces speech intelligibility.",
      "Doppler shift depends on source and observer velocities relative to the medium; a shock wave forms when a source overtakes its own acoustic disturbances."
    ],
    "boundary": "Classical sound-Doppler formulas require a specified stationary medium and subsonic velocities unless shocks are treated separately; strong shock waves, wind gradients, and nonlinear acoustics require an extended model.",
    "example": {
      "title": "Doppler shift from a moving source",
      "problem": "A 680 Hz tone source moves directly toward a stationary observer at 20 m/s through still air. Sound speed is 343 m/s. Find the received frequency.",
      "steps": [
        "During one period the source advances, shortening the forward wavelength to $\\lambda_{\\mathrm{front}} = (c - v_{\\mathrm{s}})/f$.",
        "The observer receives fronts at speed c, so $f_{\\mathrm{obs}}=c/\\lambda_{\\mathrm{front}}=fc/(c-v_{\\mathrm s})$.",
        "Substitution gives $f_{\\mathrm{obs}} = 680 \\times 343/323 = 722\\,\\mathrm{Hz}$."
      ],
      "answer": "The received frequency is approximately 722 Hz.",
      "check": "Approach must raise frequency, and setting $v_{\\mathrm{s}} = 0$ returns 680 Hz."
    },
    "pitfall": "A decibel is a logarithmic level, not a unit of intensity; equal additions in decibels multiply an intensity ratio.",
    "practice": [
      {
        "question": "Why do a flute and a violin sound different on the same note?",
        "hint": "Compare the fundamental, overtones, and temporal envelope.",
        "answer": "Their fundamental pitch may agree, but harmonic amplitudes and phases, attack, and decay differ, producing distinct timbre."
      },
      {
        "question": "An echo returns after 0.80 s with $c = 340\\,\\mathrm{m/s}$. How far away is the reflecting wall?",
        "hint": "During the measured time, sound travels to the wall and back.",
        "answer": "$d = ct/2 = 340 \\times 0.80/2 = 136\\,\\mathrm{m}$."
      }
    ]
  },
  "8.1": {
    "topicId": "8.1",
    "question": "How does random motion of an enormous number of particles produce reproducible temperature, pressure, and thermal equilibrium?",
    "overview": [
      "The molecular picture connects observable properties of matter to motion and interaction of microscopic particles. Individual velocities change continually in collisions, yet statistical averages of a large system are stable. Diffusion and Brownian motion provide directly observable consequences of this disordered motion.",
      "Temperature is a state parameter of an equilibrium system that determines the spontaneous direction of heat transfer and the distribution of energy among available degrees of freedom. The zeroth law states the transitivity of thermal equilibrium, allowing a thermometer to be calibrated through a quantity that takes the same value in systems at equilibrium."
    ],
    "conceptExplanations": [
      "Thermal motion does not cease in ordinary equilibrium: equilibrium means stationary macroscopic distributions, not rest of every molecule.",
      "Diffusion smooths concentration through random motion of many particles, while a suspended particle's Brownian path comes from a fluctuating imbalance of molecular impacts.",
      "One instantaneous microscopic energy does not define temperature; temperature characterizes an ensemble or a system sufficiently close to local equilibrium.",
      "If A is in thermal equilibrium with C and B is in equilibrium with C, then A and B are in equilibrium with each other, so C can act as a thermometer."
    ],
    "boundary": "Ordinary temperature is defined for equilibrium or local equilibrium; for a very small, rapidly changing, or strongly nonequilibrium system, one value T may not describe every energy distribution.",
    "example": {
      "title": "A constant-volume gas thermometer",
      "problem": "A dilute gas in a rigid vessel has pressure 100 kPa at 300 K. The amount of gas is fixed and remains in equilibrium. What pressure corresponds to 360 K in the ideal-gas model?",
      "steps": [
        "For fixed N and V, $pV=Nk_{\\mathrm B}T$ gives $p/T=\\mathrm{constant}$.",
        "Write $p_{2} = p_{1}T_{2}/T_{1}$.",
        "Then $p_{2} = 100\\,\\mathrm{kPa} \\times 360/300 = 120\\,\\mathrm{kPa}$."
      ],
      "answer": "The pressure is 120 kPa.",
      "check": "Temperature increased by 20%, so pressure at fixed volume and particle number also rose by 20%; absolute temperatures were used."
    },
    "pitfall": "Temperature is not total internal energy: equal-temperature systems may have different sizes, compositions, and internal energies.",
    "practice": [
      {
        "question": "Why can a gas mixture have steady pressure while every molecule continually changes momentum?",
        "hint": "Separate instantaneous fluctuations from an average over enormously many collisions.",
        "answer": "At equilibrium the velocity distribution is stationary, so the averaged momentum flux to a wall is constant although individual impacts are random."
      },
      {
        "question": "At fixed N and V, ideal-gas pressure rises from 90 to 105 kPa. Initial temperature is 270 K. Find the final temperature.",
        "hint": "Use $p_{1}/T_{1} = p_{2}/T_{2}$.",
        "answer": "$T_{2} = 270 \\times 105/90 = 315\\,\\mathrm{K}$."
      }
    ]
  },
  "8.2": {
    "topicId": "8.2",
    "question": "How do molecular collisions with a wall connect microscopic speeds to pressure and temperature of an ideal gas?",
    "overview": [
      "In the kinetic model, ideal-gas particles are small compared with their separations and interact only through elastic collisions. Changes of normal momentum in wall collisions produce pressure. Velocity isotropy connects the mean square of one component to mean-square speed.",
      "In a classical gas, each quadratic translational degree of freedom carries mean energy $k_{\\mathrm B}T/2$, so mean translational kinetic energy is $3k_{\\mathrm B}T/2$ per particle. Combining this with the mechanical pressure expression gives $pV=Nk_{\\mathrm B}T$. Internal rotational and vibrational modes require separate treatment and may be quantum mechanically frozen out."
    ],
    "conceptExplanations": [
      "Pressure is the mean normal momentum flux to a wall; more particles or a larger mean-square speed increase the rate and strength of impacts.",
      "The value $3k_{\\mathrm B}T/2$ concerns only three classical translational components and does not say that all particles have the same energy.",
      "Rotation and vibration add heat-capacity contributions when their energy levels are accessible at the stated temperature; simple classical degree counting does not always work.",
      "The equation $pV=nRT=Nk_{\\mathrm B}T$ connects equilibrium macroscopic variables but does not itself specify the velocity distribution.",
      "The model degrades at high density, with strong intermolecular interactions, near condensation, and in a quantum-degenerate regime."
    ],
    "boundary": "An ideal gas requires equilibrium, negligible particle volume, and weak interactions outside elastic collisions; the classical energy formula additionally requires nondegenerate statistics and accessible degrees of freedom.",
    "example": {
      "title": "Pressure and molecular energy",
      "problem": "One mole of monatomic ideal gas is at $T = 300\\,\\mathrm{K}$ in a volume of 24.6 L. Find pressure and mean translational kinetic energy per particle. Use $R = 8.314$ J/(mol K) and $k_{\\mathrm{B}} = 1.380649 \\times 10^{-23}\\,\\mathrm{J/K}$.",
      "steps": [
        "Convert volume: $V = 2.46 \\times 10^{-2}\\,\\mathrm{m^3}$.",
        "From $p=nRT/V$, $p = 8.314 \\times 300/0.0246 = 1.014 \\times 10^{5}\\,\\mathrm{Pa}$.",
        "Mean translational energy is $3k_{\\mathrm B}T/2$.",
        "Substitution gives $6.21 \\times 10^{-21}\\,\\mathrm{J}$ per particle."
      ],
      "answer": "$p$ is approximately $101\\,\\mathrm{kPa}$, and mean translational kinetic energy is $6.21 \\times 10^{-21}\\,\\mathrm{J}$ per particle.",
      "check": "A molar volume near 24.6 L at room temperature is consistent with pressure near one atmosphere."
    },
    "pitfall": "Do not turn a mean energy into the claim that every molecule has energy $3k_{\\mathrm B}T/2$; the speed distribution remains broad.",
    "practice": [
      {
        "question": "Why do lighter molecules move faster on average than heavier ones at equal temperature?",
        "hint": "Relate characteristic translational energy to a quantity of order $mv^2$.",
        "answer": "Mean translational energy is fixed by temperature, so characteristic mean-square speed is inversely proportional to particle mass."
      },
      {
        "question": "How many moles of ideal gas occupy 0.050 m^3 at 200 kPa and 400 K?",
        "hint": "Use $n=pV/(RT)$.",
        "answer": "$n = 200000 \\times 0.050/(8.314 \\times 400)$, approximately 3.01 mol."
      }
    ]
  },
  "8.3": {
    "topicId": "8.3",
    "question": "Why does randomness of individual motion still allow precise predictions of distributions, averages, and diffusion scales?",
    "overview": [
      "Collisions continually redistribute energy among molecules, so equal temperature does not mean equal speed. The equilibrium Maxwell speed distribution contains many slow particles, a maximum at an intermediate speed, and a decaying high-speed tail. Heating increases characteristic speeds and broadens the distribution.",
      "Macroscopic averages are stable because particle number is large, while relative fluctuations usually fall approximately as $1/\\sqrt N$ for weakly correlated contributions. A random walk has zero mean displacement but a nonzero mean-square displacement; in ordinary diffusion, that quantity grows linearly with time."
    ],
    "conceptExplanations": [
      "Elastic collisions conserve total energy while changing individual particle energies, so equilibrium specifies a probability distribution rather than one speed.",
      "The speed distribution depends on temperature and mass: raising T moves characteristic speeds upward, while raising mass at equal T moves them downward.",
      "A mean describes the statistical center, whereas a fluctuation is the departure of one measurement; relative variations are more visible in a small subsystem.",
      "For independent steps, random directions cancel mean displacement while variances add, so rms distance grows as $\\sqrt N$, not N."
    ],
    "boundary": "Normal random-walk diffusion assumes finite step variance, weak correlations, and a homogeneous medium; directed drift, trapping, long memory, or heavy-tailed steps may produce anomalous diffusion.",
    "example": {
      "title": "Scale of a random walk",
      "problem": "A particle takes independent one-dimensional steps of length $1.0\\,\\mu\\mathrm{m}$ to the right or left with equal probability. Find mean displacement and rms distance after 10000 steps.",
      "steps": [
        "Directional symmetry gives mean displacement $\\langle x\\rangle = 0$.",
        "For independent steps, $\\langle x^2\\rangle = N l^2$.",
        "Thus $x_{\\mathrm{rms}} = l \\sqrt{N} = 1.0\\,\\mu\\mathrm{m} \\times 100 = 100\\,\\mu\\mathrm{m}$."
      ],
      "answer": "Mean displacement is zero, while $x_{\\mathrm{rms}} = 100\\,\\mu\\mathrm{m}$.",
      "check": "The straight-line path length would be 10 mm; random reversal reduces typical net displacement to the $\\sqrt N$ scale."
    },
    "pitfall": "Zero mean displacement does not mean the particle remains near the origin; the distribution width continues to grow.",
    "practice": [
      {
        "question": "What happens to one gas's speed distribution when temperature rises?",
        "hint": "Connect characteristic kinetic energy with k_B T.",
        "answer": "The maximum shifts toward higher speed, the distribution broadens, and the fraction of fast particles increases."
      },
      {
        "question": "By what factor does random-walk rms displacement change if the number of independent steps increases ninefold?",
        "hint": "$x_{\\mathrm{rms}}$ is proportional to $\\sqrt N$.",
        "answer": "It increases by a factor of 3."
      }
    ]
  },
  "8.4": {
    "topicId": "8.4",
    "question": "How can we balance system energy unambiguously while distinguishing stored internal energy from transfer mechanisms?",
    "overview": [
      "Internal energy U contains microscopic kinetic and potential contributions within the chosen system and is a state function. Heat Q and work W characterize transfers across its boundary, so a system does not contain an amount of heat or work. Their values depend on the path between states.",
      "Adopt the convention Q positive into the system and W positive when done by the system on its surroundings. Then $\\Delta U = Q - W_{\\mathrm{total}}$. For a simple compressible body, boundary work is the integral of $p_{\\mathrm{ext}}\\,dV$; it equals total work only when electrical, chemical, surface, and other work channels are absent."
    ],
    "conceptExplanations": [
      "The change in U is determined only by initial and final equilibrium states, although the division of transferred energy into Q and W depends on process.",
      "Heat transfer is driven by temperature difference, while work is organized transfer through a generalized force and displacement; after crossing the boundary, energy belongs to U or macroscopic energy.",
      "With this convention, heat input raises the balance and positive work by the system lowers it; another convention changes the sign before W together with its definition.",
      "$W_{\\mathrm{total}}$ sums every work mode, whereas the pV term accounts only for motion of a mechanical boundary against external pressure.",
      "Area under $p_{\\mathrm{ext}}(V)$ has units $Pa m^3 = J$ and gives all work only if no other work coordinates are present.",
      "For example, $C_V$ describes heating at fixed volume with no pV work, while $C_p$ includes energy needed for expansion at fixed pressure."
    ],
    "boundary": "The balance requires a declared system and sign convention; $W_{\\mathrm{pV}} = \\int p_{\\mathrm{ext}} dV$ assumes a simple moving boundary and external pressure, while using system pressure along the path additionally requires quasistatic mechanical equilibrium.",
    "example": {
      "title": "Heating an expanding gas",
      "problem": "A closed gas absorbs $Q = 2.20$ kJ and expands by 0.0100 m^3 against constant external pressure 150 kPa. No other work occurs. Find W and $\\Delta U$ with W positive when done by the system.",
      "steps": [
        "Boundary work is $W = p_{\\mathrm{ext}} \\Delta V = 150000 \\times 0.0100 = 1500\\,\\mathrm{J}$.",
        "Because the gas expands, work by the system is positive.",
        "The first law gives $\\Delta U = Q - W = 2200 - 1500 = 700\\,\\mathrm{J}$."
      ],
      "answer": "$W = +1.50$ kJ and $\\Delta U = +0.70$ kJ.",
      "check": "The 2.20 kJ input splits into 1.50 kJ of work and a 0.70 kJ increase in internal energy."
    },
    "pitfall": "Do not say that a body 'contains heat': heat denotes energy crossing a boundary because of temperature difference, while internal energy describes storage.",
    "practice": [
      {
        "question": "Why do Q and W depend on path while $\\Delta U$ does not?",
        "hint": "Compare two processes between identical states with different pV paths.",
        "answer": "U is fixed by states, but work area and required heat transfer can differ; the first law preserves the same difference Q - W."
      },
      {
        "question": "A system receives 500 J as heat, and an external force does 120 J of work on it. Find $\\Delta U$ under this convention.",
        "hint": "Work on the system means $W_{\\mathrm{by\\,system}}=-120\\,\\mathrm J$.",
        "answer": "$\\Delta U = 500 - (-120) = 620\\,\\mathrm{J}$."
      }
    ]
  },
  "8.5": {
    "topicId": "8.5",
    "question": "Where does transferred energy go when temperature, phase, and heat-transfer mechanism change?",
    "overview": [
      "Within one phase and over a modest interval, heat is often estimated as $Q = mc\\Delta T$, where c depends on substance and process conditions. During an equilibrium first-order phase transition, energy changes structure and intermolecular binding, so temperature can remain constant while $Q=mL$.",
      "A phase diagram identifies the stable phase as a function of variables, commonly T and p, and marks coexistence lines. Energy moves by conduction through microscopic interactions, by convection with moving matter, and by electromagnetic radiation; real problems often combine all three."
    ],
    "conceptExplanations": [
      "Specific heat capacity is energy per unit mass per temperature change for a stated process; it need not remain constant over a wide interval.",
      "Latent heat changes phase fraction without necessarily changing temperature at a fixed-pressure equilibrium transition; its sign depends on transition direction.",
      "A phase-diagram line marks phase coexistence, a triple point marks three-phase coexistence, and a critical point terminates the liquid-gas distinction.",
      "Conduction requires a temperature gradient, convection carries enthalpy with moving matter, and radiation can cross a vacuum."
    ],
    "boundary": "The formulas $Q = mc\\Delta T$ and $Q=mL$ use tabulated equilibrium properties at stated pressure and assume a nearly uniform body temperature; rapid heating, chemical reaction, variable c, or a nonequilibrium transition requires integration and transport modeling.",
    "example": {
      "title": "Melting and then warming ice",
      "problem": "Convert 0.200 kg of ice at 0 degrees C into water at 20 degrees C. Take $L_{\\mathrm{f}} = 334$ kJ/kg and $c_{\\mathrm{water}} = 4.18$ kJ/(kg K). Neglect loss.",
      "steps": [
        "Melting requires $Q_{1} = mL_{\\mathrm{f}} = 0.200 \\times 334 = 66.8$ kJ.",
        "Warming the water requires $Q_2=mc\\Delta T=0.200\\times4.18\\times20=16.72\\,\\mathrm{kJ}$.",
        "Total energy is $Q = Q_{1} + Q_{2} = 83.52$ kJ."
      ],
      "answer": "Approximately 83.5 kJ is required.",
      "check": "Most energy went into the phase transition; treating the entire process with one $mc\\Delta T$ expression would be wrong."
    },
    "pitfall": "Constant temperature during melting does not mean that no energy is transferred; the energy changes phase rather than temperature.",
    "practice": [
      {
        "question": "Why does a vacuum suppress gas conduction and convection without eliminating heat exchange?",
        "hint": "Which mechanism requires no matter between the bodies?",
        "answer": "Without a medium, gas conduction and convection nearly vanish, but bodies still exchange electromagnetic thermal radiation."
      },
      {
        "question": "How much energy heats 0.50 kg of water by 10 K if $c = 4.18$ kJ/(kg K)?",
        "hint": "Use $Q = mc\\Delta T$.",
        "answer": "$Q = 0.50 \\times 4.18 \\times 10 = 20.9$ kJ."
      }
    ]
  },
  "8.6": {
    "topicId": "8.6",
    "question": "How does a path on a state diagram determine work and heat even though internal-energy change is fixed only by its endpoints?",
    "overview": [
      "Isochoric, isobaric, isothermal, and adiabatic processes impose different constraints: fixed V, p, T, or no heat transfer, respectively. They are not interchangeable. A quasistatic process passes through a sequence of near-equilibrium states, allowing system pressure and temperature to be defined at each step.",
      "On a pV diagram, boundary work by the system is the oriented area under a path when the pressure used for work is appropriate. Over a complete cycle U returns to its initial value, so $\\Delta U_{\\mathrm{cycle}} = 0$ and net heat equals net work under the chosen convention. An irreversible real path may not possess one well-defined internal pV curve."
    ],
    "conceptExplanations": [
      "Isothermal does not mean $Q = 0$, and adiabatic does not mean $\\Delta T = 0$; the constraints are related through the first law and equation of state.",
      "Quasistatic change requires relaxation much faster than external driving; it does not by itself guarantee reversibility when friction or a finite temperature gradient is present.",
      "A closed loop has oriented area: clockwise traversal usually corresponds to positive net pV work by the system.",
      "Each leg separately obeys $\\Delta U = Q - W$, and the sums over a cycle must give zero change for every state function.",
      "Idealizations make a path calculable, while real processes include finite pressure and temperature differences, viscosity, leakage, and dissipation."
    ],
    "boundary": "Equilibrium pV paths and tabulated heat capacities apply to quasistatic states of a simple compressible system; during rapid irreversible expansion, system pressure may be nonuniform and work must be computed from boundary external pressure.",
    "example": {
      "title": "Isobaric heating of a monatomic ideal gas",
      "problem": "One mole of monatomic ideal gas is heated quasistatically at constant pressure from 300 to 450 K. No other work occurs. Find W, $\\Delta U$, and Q using $R = 8.314$ J/(mol K) and W positive when done by the gas.",
      "steps": [
        "At constant $p$ for an ideal gas, $W = p\\,\\Delta V = nR\\,\\Delta T = 1.247\\,\\mathrm{kJ}$.",
        "For a monatomic ideal gas, $\\Delta U=3nR\\Delta T/2=1.871\\,\\mathrm{kJ}$.",
        "The first law gives $Q = \\Delta U + W = 3.118$ kJ."
      ],
      "answer": "$W = 1.25$ kJ, $\\Delta U = 1.87$ kJ, and $Q = 3.12$ kJ.",
      "check": "Q exceeds $\\Delta U$ because part of the supplied energy became positive expansion work."
    },
    "pitfall": "An adiabatic process need not be isothermal: with $Q = 0$, work usually changes internal energy and temperature.",
    "practice": [
      {
        "question": "Can a quasistatic process be irreversible?",
        "hint": "Quasistatic means near equilibrium, but consider friction.",
        "answer": "Yes. Slow piston motion with dry friction can pass through near-equilibrium states while dissipation makes the process irreversible."
      },
      {
        "question": "A gas completes a cycle and does 400 J of net work. Find the net heat received by the gas under this chapter's convention.",
        "hint": "For a cycle, $\\Delta U = 0$.",
        "answer": "From $0 = Q - W$, $Q = +400\\,\\mathrm{J}$."
      }
    ]
  },
  "8.7": {
    "topicId": "8.7",
    "question": "How does the number of compatible microstates explain equilibrium, irreversibility, and local entropy decrease?",
    "overview": [
      "A macrostate is fixed by a few measured variables, whereas a microstate specifies all microscopic degrees of freedom. Equilibrium is overwhelmingly likely because it usually corresponds to most accessible microstates. For $\\Omega$ equiprobable states, $S = k_{\\mathrm{B}}\\ln\\Omega$; for discrete probabilities, $S_{\\mathrm{G}} = -k_{\\mathrm{B}}\\sum_i p_i\\ln p_i$.",
      "Thermodynamic entropy change between equilibrium states can be computed along an auxiliary reversible path: $\\Delta S = \\int \\delta Q_{\\mathrm{rev}}/T$. The second law requires nondecrease of total entropy for an isolated system. Entropy of a selected subsystem can fall if entropy transfer to the surroundings and entropy production are included in the full balance."
    ],
    "conceptExplanations": [
      "Many different particle positions and momenta give the same p, V, and T; entropy connects macroscopic description to the multiplicity of these realizations.",
      "A fluctuation away from equilibrium is possible, but in a macroscopic system the fraction of corresponding microstates is ordinarily extraordinarily small.",
      "The logarithm makes entropy additive for independent systems because joint microstate counts multiply while their logarithms add.",
      "For an isolated system, a spontaneous process has $\\Delta S_{\\mathrm{total}} \\ge 0$; equality describes the ideal reversible limit.",
      "The macroscopic arrow of time appears because evolution from a rare state almost always enters a vastly larger set of equilibrium microstates.",
      "A refrigerator lowers entropy inside its cabinet, but input work and rejected heat raise surroundings entropy by at least as much."
    ],
    "boundary": "$S = k_{\\mathrm{B}}\\ln\\Omega$ requires an equiprobable set, while $-k_{\\mathrm{B}}\\sum_i p_i\\ln p_i$ requires normalized discrete classical probabilities; continuous and quantum systems require a suitably refined measure and definition.",
    "example": {
      "title": "Entropy of free expansion",
      "problem": "One mole of ideal gas freely expands inside an isolated vessel from volume V to 2V. Find the gas entropy change.",
      "steps": [
        "The real process is irreversible with $Q = 0$ and $W = 0$, but $\\Delta S$ is a state-function change and may be evaluated on a reversible isothermal path between the same states.",
        "Along that path, $\\delta Q_{\\mathrm{rev}} = nRT\\,dV/V$, so $\\Delta S = nR\\int dV/V$.",
        "Thus $\\Delta S = nR\\ln 2 = 8.314 \\times 0.693 = 5.76\\,\\mathrm{J/K}$."
      ],
      "answer": "The gas entropy increases by 5.76 J/K.",
      "check": "The isolated gas gained accessible volume, increasing its microstate count and entropy despite $Q = 0$ on the real path."
    },
    "pitfall": "The entropy integral uses reversible heat on an auxiliary path; inserting actual irreversible-process heat, such as zero in free expansion, gives a wrong result.",
    "practice": [
      {
        "question": "Does crystallization violate the second law because the material entropy decreases?",
        "hint": "Expand the system to include the surroundings that receive latent heat.",
        "answer": "No. Crystal entropy decrease is offset by an equal or larger surroundings increase; the law applies to the complete isolated composite."
      },
      {
        "question": "How does entropy change if equiprobable microstates increase from $\\Omega$ to $4\\Omega$?",
        "hint": "Subtract $k_{\\mathrm{B}}\\ln\\Omega$ from $k_{\\mathrm{B}}\\ln(4\\Omega)$.",
        "answer": "$\\Delta S = k_{\\mathrm{B}} \\ln 4 = 2 k_{\\mathrm{B}} \\ln 2$."
      }
    ]
  },
  "8.8": {
    "topicId": "8.8",
    "question": "What limits does the second law place on converting heat into work, and which energy function is minimized under stated constraints?",
    "overview": [
      "A heat engine receives $Q_{\\mathrm h}$ from a hot reservoir, delivers work W, and rejects $Q_{\\mathrm c}$ to a cold reservoir. A refrigerator uses work to move heat against its spontaneous direction, while a heat pump is rated by heat delivered to the warm side. Efficiency and coefficient of performance have different definitions and must not be confused.",
      "A reversible Carnot cycle sets the upper bound $\\eta_{\\mathrm{C}} = 1 - T_{\\mathrm{c}}/T_{\\mathrm{h}}$ for an engine between two reservoirs. Free energies express related balances under other constraints: for a closed system at fixed T,V without non-pV work, $\\Delta F \\le 0$; at fixed T,p under the corresponding restrictions, $\\Delta G \\le 0$."
    ],
    "conceptExplanations": [
      "An engine delivers $W = Q_{\\mathrm h}-Q_{\\mathrm c}$, a refrigerator has $\\mathrm{COP}_{\\mathrm R}=Q_{\\mathrm{cold}}/W$, and a heat pump has $\\mathrm{COP}_{\\mathrm{HP}}=Q_{\\mathrm{hot}}/W$; either COP may exceed one without violating energy conservation.",
      "Efficiency $\\eta = W/Q_{\\mathrm{h}}$ is bounded by one, whereas refrigerator COP compares moved heat with work and therefore has a different range.",
      "Carnot reaches the bound only in a reversible cycle with constant-temperature reservoirs; finite temperature differences and friction produce entropy and lower performance.",
      "$F = U-TS$ accounts for exchange with a thermostat; at fixed $T,V$, its decrease constrains useful work available under the stated conditions.",
      "$G = H-TS$ is useful at fixed $T,p$; $\\Delta G\\le 0$ is a criterion under those constraints, not for every process."
    ],
    "boundary": "The Carnot bound assumes two ideal reservoirs and a cyclic device, while F and G criteria require a closed system, fixed T,V or T,p respectively, and no non-pV work; outside those conditions use another potential and the complete balance.",
    "example": {
      "title": "Carnot engine bound",
      "problem": "An engine operates between 600 K and 300 K reservoirs and receives 1.00 kJ per cycle from the hot reservoir. Find maximum efficiency and work and minimum heat rejected to the cold reservoir.",
      "steps": [
        "The bound is $\\eta_{\\mathrm{C}} = 1 - T_{\\mathrm{c}}/T_{\\mathrm{h}} = 1 - 300/600 = 0.50$.",
        "Maximum work is $W_{\\mathrm{max}} = \\eta_{\\mathrm{C}} Q_{\\mathrm{h}} = 0.50$ kJ.",
        "Energy conservation gives $Q_{\\mathrm{c,min}} = Q_{\\mathrm{h}} - W_{\\mathrm{max}} = 0.50$ kJ."
      ],
      "answer": "$\\eta_{\\mathrm{max}} = 50\\%$, $W_{\\mathrm{max}} = 0.50\\,\\mathrm{kJ}$, and $Q_{\\mathrm{c,min}} = 0.50\\,\\mathrm{kJ}$ per cycle.",
      "check": "Even a reversible engine must reject some heat to the cold reservoir; 100% is incompatible with the second law here."
    },
    "pitfall": "Do not apply $\\Delta G<0$ to an isolated system at arbitrary T and p; the criterion is derived for specific fixed external conditions.",
    "practice": [
      {
        "question": "Why can a refrigerator COP equal 3 without implying 300% efficiency?",
        "hint": "The refrigerator does not create all moved energy from work.",
        "answer": "COP compares heat removed from the cabinet with work; heat delivered outside is their sum, so energy conservation remains satisfied."
      },
      {
        "question": "What is the maximum engine efficiency between 500 K and 300 K?",
        "hint": "Use absolute temperatures in $\\eta_{\\mathrm{C}} = 1 - T_{\\mathrm{c}}/T_{\\mathrm{h}}$.",
        "answer": "$\\eta_{\\mathrm{C}} = 1 - 300/500 = 0.40$, or 40%."
      }
    ]
  },
  "9.1": {
    "topicId": "9.1",
    "question": "How does one conserved microscopic charge produce attraction, conduction, polarization, and grounding in macroscopic matter?",
    "overview": [
      "Electric charge sets the sign and strength of electromagnetic interaction. Like charges repel and unlike charges attract, but force direction should follow from the vector law rather than a separate mnemonic. Total charge is conserved in a closed system; an object's charge changes by transfer across its boundary.",
      "In ordinary matter, charge occurs in integer multiples of elementary charge within the particle description. Mobile carriers redistribute in a conductor, while bound positive and negative charges shift slightly in a dielectric and create polarization. Grounding connects an object to a large charge reservoir and fixes its potential only within the Earth-as-conductor model."
    ],
    "conceptExplanations": [
      "The labels positive and negative are conventional, but relative sign is measurable because it determines force direction and contribution to total charge.",
      "Local charge continuity connects change inside a volume to current through its surface; quantization gives $Q = n e$ for an isolated collection of ordinary carriers.",
      "A conductor has carriers able to move macroscopically, whereas a dielectric responds mainly through small displacement of bound positive and negative charge.",
      "A charged object can separate charges in a neutral conductor without contact; grounding lets carriers enter or leave, and disconnection order determines residual charge."
    ],
    "boundary": "Charge conservation is fundamental, but a simple picture of point electrons and linear polarization does not describe breakdown, electrochemistry, strong-field ionization, or frequency-dependent material response.",
    "example": {
      "title": "Counting transferred electrons",
      "problem": "A small body acquires charge $Q = -3.204 \\times 10^{-16}\\,\\mathrm{C}$. How many excess electrons did it receive? Use $e = 1.602 \\times 10^{-19}\\,\\mathrm{C}$.",
      "steps": [
        "The negative sign denotes excess electrons, each carrying -e.",
        "Carrier count is $N = |Q|/e$.",
        "$N = \\frac{3.204 \\times 10^{-16}}{1.602 \\times 10^{-19}} = 2000$."
      ],
      "answer": "The body received 2000 excess electrons.",
      "check": "N is dimensionless and integral; total electron charge -Ne reproduces Q."
    },
    "pitfall": "An electrically neutral object is not devoid of charges: its total positive and negative charges cancel but can still polarize.",
    "practice": [
      {
        "question": "Why can a charged rod attract a neutral dielectric fragment?",
        "hint": "Consider a small displacement of bound charges and field nonuniformity.",
        "answer": "The field polarizes the dielectric; nearer opposite bound charge feels a larger force than farther like charge, producing net attraction."
      },
      {
        "question": "What is the charge after $5.0 \\times 10^{6}$ electrons are removed from a body?",
        "hint": "Removing negative charge leaves positive charge; $Q=Ne$.",
        "answer": "$Q = +5.0 \\times 10^{6} \\times 1.602 \\times 10^{-19}\\,\\mathrm{C} = +8.01 \\times 10^{-13}\\,\\mathrm{C}$."
      }
    ]
  },
  "9.2": {
    "topicId": "9.2",
    "question": "How can a charge distribution determine local electric field without treating field lines as physical objects?",
    "overview": [
      "Coulomb's law gives the vacuum force between stationary point charges: magnitude falls as $1/r^2$ and direction lies along their separation. Vector form automatically handles signs and direction. With several sources, forces and fields add vectorially by superposition.",
      "Electric field E is force per unit positive test charge in the limit that the probe does not disturb the sources: $F = q_{\\mathrm{test}} E$. Field lines encode only tangent direction and qualitative density; their count and placement are chosen by the illustrator, the lines do not move, and they cannot cross where field direction is unique."
    ],
    "conceptExplanations": [
      "A point source q produces $\\mathbf E = kq\\,\\mathbf r/r^3$; the singularity at $r = 0$ marks an idealization limit rather than an infinite measurable field inside a real extended body.",
      "Each source contribution is evaluated independently in an unchanged linear medium and components are summed; magnitudes can be added only for aligned vectors.",
      "E has units N/C or V/m; field depends on sources and position, whereas force also depends on the probe charge.",
      "Denser drawn lines conventionally indicate stronger field, but the drawing does not define exact magnitude or literal connections between charges."
    ],
    "boundary": "The direct Coulomb formula applies to stationary point charges in vacuum; extended charge requires integration, matter requires polarization, and rapidly changing sources require retarded electromagnetic fields.",
    "example": {
      "title": "Field at the center of an electric dipole",
      "problem": "Charges +2.0 nC and -2.0 nC lie on the x-axis at -0.10 m and +0.10 m. Find the field at the origin; $k = 8.99 \\times 10^{9}\\,\\mathrm{N m^2/C^2}$.",
      "steps": [
        "The positive charge field at the center points right, away from its source.",
        "The negative charge field also points right, toward its source; both magnitudes are $k|q|/r^2$.",
        "$E = 2k|q|/r^2 = 2 \\times 8.99 \\times 10^{9} \\times 2.0 \\times 10^{-9} / 0.10^2 = 3.60 \\times 10^{3}\\,\\mathrm{N/C}$."
      ],
      "answer": "$E = 3.60\\,\\mathrm{kN/C}$ along +x, from the positive charge toward the negative one.",
      "check": "The contributions reinforce rather than cancel because both arrows point the same way at the midpoint."
    },
    "pitfall": "Zero net charge does not imply zero field everywhere: a dipole's far field falls faster than a monopole field but remains nonzero.",
    "practice": [
      {
        "question": "Can two field lines cross where E is nonzero?",
        "hint": "A vector at one point has one direction.",
        "answer": "No. A crossing would assign two tangent directions to one vector; at $E = 0$ the direction is simply undefined."
      },
      {
        "question": "What is the field magnitude 0.30 m from a +1.0 nC point charge in vacuum?",
        "hint": "Use $E=kq/r^2$.",
        "answer": "$E = 8.99 \\times 10^{9} \\times 1.0 \\times 10^{-9} / 0.30^2$, approximately 100 N/C."
      }
    ]
  },
  "9.3": {
    "topicId": "9.3",
    "question": "Why does Gauss's law always connect flux with charge yet determine field directly only under strong symmetry?",
    "overview": [
      "Electric flux through an oriented surface is the integral of $\\mathbf E\\cdot d\\mathbf A$ and counts only normal field. Its sign follows the selected normal. For a closed surface, Gauss's law states that total flux is $Q_{\\mathrm{inside}}/\\varepsilon_0$, independent of surface shape and external charges.",
      "An external charge may produce a large surface field, but its lines enter and leave, giving zero net flux. Extracting E from the integral requires symmetry that makes magnitude constant on chosen parts and direction known. A sphere, infinite cylinder, and infinite plane provide standard cases; an arbitrary shape generally does not."
    ],
    "conceptExplanations": [
      "For a small flat element, the contribution is E dA $\\cos\\theta$; tangential field does not cross the surface and contributes no flux.",
      "In differential form, $\\nabla\\cdot E = \\rho/\\varepsilon_{0}$ shows that electric charge is the local source or sink of electric field.",
      "The law counts only algebraic enclosed charge, but every charge, including external ones, contributes to the field in the integral.",
      "Spherical symmetry makes E radial and constant on a sphere, cylindrical symmetry makes it constant on a lateral surface, and planar symmetry makes it normal to parallel faces.",
      "Without symmetry the flux equality stays exact, but one integral quantity cannot determine many unknown E values over a surface."
    ],
    "boundary": "Gauss's law is exact in electrodynamics, but elementary extraction of E from flux needs an ideally symmetric distribution; a finite plane, short cylinder, or nonuniform sphere has edge or angular dependence.",
    "example": {
      "title": "Flux and field of a spherically symmetric charge",
      "problem": "A +3.0 nC charge is enclosed in a spherically symmetric distribution. Find flux through a sphere and field at radius 0.20 m. Use $\\varepsilon_{0} = 8.854 \\times 10^{-12}\\,\\mathrm{F/m}$.",
      "steps": [
        "Gauss's law gives $\\Phi_{\\mathrm{E}} = Q/\\varepsilon_{0} = \\frac{3.0 \\times 10^{-9}}{8.854 \\times 10^{-12}} = 339\\,\\mathrm{N m}^2/C$.",
        "Symmetry gives constant radial field, so $\\Phi_{\\mathrm{E}} = E 4 \\pi r^2$.",
        "$E = Q/(4 \\pi \\varepsilon_{0} r^2)$, approximately 674 N/C outward."
      ],
      "answer": "$\\Phi_E$ is about 339 N m^2/C and E is about 674 N/C outward.",
      "check": "Flux is radius-independent while field falls as $1/r^2$, exactly offsetting the sphere's area growth."
    },
    "pitfall": "Zero flux does not imply zero field on a surface: nonzero inward and outward contributions may cancel.",
    "practice": [
      {
        "question": "Why does an external point charge not change total flux through a closed surface?",
        "hint": "Track lines that enter and later leave the volume.",
        "answer": "Each external contribution crosses the closed surface with opposite signs on entry and exit, producing zero net flux."
      },
      {
        "question": "How does field outside a spherically symmetric charge change when observation radius doubles?",
        "hint": "Enclosed charge stays fixed while sphere area grows as r^2.",
        "answer": "The field decreases by a factor of 4."
      }
    ]
  },
  "9.4": {
    "topicId": "9.4",
    "question": "How does scalar potential encode electric-field work, and why does motion along an equipotential require no electrostatic work?",
    "overview": [
      "For an electrostatic field, work between two points is path-independent, so potential energy U and potential $\\varphi = U/q$ can be defined for a probe charge. The difference $V_B-V_A$ is energy change per unit positive charge and is opposite to field work per unit charge.",
      "Field points toward steepest potential decrease: $E = -\\nabla(\\varphi)$. Therefore E is perpendicular to an equipotential surface and displacement along it does not change U. The zero of $\\varphi$ is conventional; differences are physical unless boundary conditions establish a reference."
    ],
    "conceptExplanations": [
      "Potential energy belongs to the charge configuration; moving probe q changes it by $q\\Delta\\varphi$.",
      "Potential is a source scalar, so point-charge contributions add algebraically more simply than vector fields.",
      "Voltage from A to B is $\\Delta V = V_{\\mathrm{B}} - V_{\\mathrm{A}}$; its sign follows point order, not the word voltage alone.",
      "Tangential electrostatic field vanishes on an equipotential surface, or the field would do work along that surface.",
      "The minus sign in $E = -\\nabla(\\varphi)$ indicates motion toward lower potential, and a steep spatial slope means strong field."
    ],
    "boundary": "One scalar electrostatic potential describes a curl-free field of stationary charges; a changing magnetic flux gives nonzero circulation of E, so $\\varphi$ alone is insufficient.",
    "example": {
      "title": "Potential difference from a point charge",
      "problem": "A +2.0 nC source is in vacuum. Find $\\Delta V = V_{\\mathrm{B}} - V_{\\mathrm{A}}$ from $r_{\\mathrm{A}} = 0.20\\,\\mathrm{m}$ to $r_{\\mathrm{B}} = 0.50\\,\\mathrm{m}$ with $V(\\infty)=0$ and $k = 8.99 \\times 10^{9}\\,\\mathrm{N m^2/C^2}$.",
      "steps": [
        "Point-charge potential is $V(r)=kq/r$.",
        "$V_{\\mathrm{A}} = 89.9\\,\\mathrm{V}$ and $V_{\\mathrm{B}} = 36.0\\,\\mathrm{V}$.",
        "$\\Delta V = 36.0 - 89.9 = -53.9\\,\\mathrm{V}$."
      ],
      "answer": "$\\Delta V = -53.9\\,\\mathrm{V}$; potential falls on moving away from a positive charge.",
      "check": "Potential approaches zero as r increases, so the final value must be below the initial value."
    },
    "pitfall": "Positive potential does not imply positive potential energy for every probe: $U=qV$ changes sign with q.",
    "practice": [
      {
        "question": "Can field be nonzero at a point where the selected potential is zero?",
        "hint": "Field depends on gradient, while potential zero may be shifted by a constant.",
        "answer": "Yes. One value of V depends on reference, whereas E depends on spatial variation of V."
      },
      {
        "question": "A $+3.0\\,\\mu\\mathrm{C}$ charge crosses $\\Delta V = -20\\,\\mathrm{V}$. Find $\\Delta U$.",
        "hint": "Use $\\Delta U = q \\Delta V$.",
        "answer": "$\\Delta U = 3.0 \\times 10^{-6} \\times (-20) = -6.0 \\times 10^{-5}\\,\\mathrm{J}$."
      }
    ]
  },
  "9.5": {
    "topicId": "9.5",
    "question": "How does redistribution of free and bound charge determine capacitance and stored field energy?",
    "overview": [
      "At electrostatic equilibrium, field inside the bulk of an ideal conductor is zero, its potential is constant, and excess free charge lies on its surface. Boundary geometry determines surface density and outside field; charge usually concentrates more strongly near sharp regions.",
      "Capacitance $C = Q/V$ characterizes geometry and medium between two conductors, not the current Q alone. Large parallel plates give C approximately $\\varepsilon A/d$. A dielectric polarizes and changes the relation between free charge and voltage. Energy $U = Q^2/(2C) = CV^2/2$ resides in the electromagnetic field of the whole configuration."
    ],
    "conceptExplanations": [
      "If a static field existed inside conducting material, mobile carriers would keep moving; equilibrium requires $E_{\\mathrm{inside}} = 0$, although a cavity or nearby surface may contain nonzero field.",
      "C depends on shape, separation, and permittivity; changing a connected source changes Q and V according to that characteristic.",
      "The expression $\\varepsilon A/d$ neglects fringing and assumes plate separation much smaller than plate dimensions.",
      "Bound polarization charge usually reduces field for fixed free Q; at fixed V, a source may deliver additional free charge.",
      "Linear-field energy density is $\\varepsilon E^2/2$, so energy is distributed in space rather than stored only on metal plates."
    ],
    "boundary": "An ideal conductor assumes electrostatic equilibrium, while parallel-plate formulas assume a linear homogeneous dielectric, negligible fringing, and no leakage or breakdown.",
    "example": {
      "title": "A parallel-plate air capacitor",
      "problem": "Plates of area 0.010 m^2 are separated by 1.0 mm of air and connected to 100 V. Take $\\varepsilon_{0} = 8.854 \\times 10^{-12}\\,\\mathrm{F/m}$. Find C, Q, and U while neglecting edges.",
      "steps": [
        "First calculate the capacitance: $C = \\varepsilon_{0} A/d = 8.854 \\times 10^{-12} \\times 0.010/0.001 = 8.854 \\times 10^{-11}\\,\\mathrm{F}$.",
        "Then find the plate charge: $Q=CV=8.854\\times10^{-9}\\,\\mathrm C$.",
        "The electric-field energy is $U = CV^2/2 = 4.427\\times10^{-7}\\,\\mathrm{J}$."
      ],
      "answer": "$C = 88.5\\,\\mathrm{pF}$, $Q = 8.85\\,\\mathrm{nC}$, and $U = 0.443\\,\\mu\\mathrm{J}$.",
      "check": "Doubling V would double Q but multiply energy by four."
    },
    "pitfall": "$Q^2/(2C)$ and $CV^2/2$ describe the same state, but when C changes the outcome depends on whether a source remains connected and Q or V is fixed.",
    "practice": [
      {
        "question": "What happens to C and Q when a linear dielectric of $\\varepsilon_r>1$ fully fills plates held at constant V?",
        "hint": "The source maintains V and may move free charge.",
        "answer": "Capacitance rises by $\\varepsilon_r$, and at fixed V the charge $Q=CV$ rises by the same factor."
      },
      {
        "question": "A $10\\,\\mu\\mathrm{F}$ capacitor is charged to 12 V. Find its stored energy.",
        "hint": "Use $U = CV^2/2$.",
        "answer": "$U = 0.5 \\times 10 \\times 10^{-6} \\times 12^2 = 7.2 \\times 10^{-4}\\,\\mathrm{J}$."
      }
    ]
  },
  "9.6": {
    "topicId": "9.6",
    "question": "How does slow drift of enormous numbers of carriers create current, and why does resistance depend on material, geometry, and temperature?",
    "overview": [
      "Current $I = dQ/dt$ measures charge transfer rate through a selected cross-section, while current density J describes it locally. Metal electrons have large random thermal speeds, but an electric field adds a small directed drift; the sum over many carriers makes a measurable current.",
      "For a uniform conductor, $R = \\rho l/A$ connects resistance to material resistivity and geometry. $V=IR$ describes a linear ohmic regime under nearly constant conditions. Temperature changes scattering and carrier concentration, so dependence differs among metals, semiconductors, and other materials."
    ],
    "conceptExplanations": [
      "Conventional current points with positive charge motion; metal electrons drift oppositely, and J may vary across a section.",
      "The field signal establishes along a circuit much faster than one electron traverses the wire, so lamp response does not await an electron from the source.",
      "$\\rho$ is a material property at specified temperature, whereas R also grows with length and falls with cross-sectional area.",
      "An ohmic element has a linear current-voltage curve within a chosen range; a diode, heating lamp, or electrolyte generally violates simple proportionality.",
      "Metals usually gain R as temperature rises through stronger scattering, but a positive coefficient is not universal for all conductors."
    ],
    "boundary": "$V=IR$ with constant R requires a linear steady regime and nearly fixed temperature; strong heating, frequency effects, contact resistance, and nonlinear carriers need a local or dynamic model.",
    "example": {
      "title": "Resistance of a copper wire",
      "problem": "A 10 m copper wire has area 1.0 mm^2 and $\\rho = 1.68 \\times 10^{-8}\\,\\Omega\\,\\mathrm{m}$ at the stated temperature. A 1.0 V potential difference is applied. Find R, I, and power.",
      "steps": [
        "$A = 1.0 \\times 10^{-6}\\,\\mathrm{m^2}$, so $R = \\rho l/A = 0.168\\,\\Omega$.",
        "$I = V/R = 1.0/0.168 = 5.95\\,\\mathrm{A}$.",
        "The power in the element is $P=VI=5.95\\,\\mathrm{W}$."
      ],
      "answer": "$R = 0.168\\,\\Omega$, $I = 5.95\\,\\mathrm{A}$, and $P = 5.95\\,\\mathrm{W}$ if $\\rho$ remains fixed.",
      "check": "The large current may heat a thin wire and change $\\rho$, so the final assumption needs checking in a real device."
    },
    "pitfall": "Electron drift speed is small, but current can be large because carrier density is enormous; drift speed is not signal propagation speed.",
    "practice": [
      {
        "question": "Why does joining two identical wires in series double resistance?",
        "hint": "Their effective total length doubled at unchanged cross-section.",
        "answer": "For uniform material $R = \\rho l/A$, so doubling length doubles resistance; the same current traverses both pieces."
      },
      {
        "question": "A resistor has $R = 4\\,\\Omega$ at 8 V. Find current and heating power.",
        "hint": "Use $I = V/R$ and then $P=VI$.",
        "answer": "$I = 2\\,\\mathrm{A}$ and $P = 16\\,\\mathrm{W}$."
      }
    ]
  },
  "9.7": {
    "topicId": "9.7",
    "question": "How does a source maintain potential difference, and by what route does energy reach and dissipate in a load?",
    "overview": [
      "A source's electromotive force is work by non-electrostatic processes per unit charge moved inside the source. A real source has internal resistance or a more complicated impedance, so terminal voltage under load differs from emf and some power dissipates internally.",
      "In a resistive load, $P = VI = I^2R = V^2/R$ when V and I refer to that element. Maximum simple-load power occurs at $R_{\\mathrm{load}} = r_{\\mathrm{internal}}$, but then half the power is lost in the source, so this is not maximum efficiency. Energy flows through electromagnetic fields around conductors; electrons support current but are not a consumable energy supply stored in the wire."
    ],
    "conceptExplanations": [
      "Emf has units volts and describes energy per charge supplied by chemical, mechanical, or other forces, not a mechanical force in newtons.",
      "For emf $\\varepsilon$ in series with r during discharge, $V_{\\mathrm{terminal}} = \\varepsilon-Ir$; the drop Ir grows with current and transfers energy into internal heat.",
      "Joule heating results as the field gives energy to carriers and they scatter into the lattice; the usable P expression depends on known variables and whether the element is ohmic.",
      "Maximum-power matching is useful for signals, but energy sources usually use $R_{\\mathrm{load}}$ much greater than r for high efficiency.",
      "The Poynting vector describes field-energy flow into a load from surrounding space, while carrier drift closes the electrical circuit."
    ],
    "boundary": "A constant emf plus one internal resistance works only over a limited current, temperature, and state-of-charge range; a real battery has dynamics, nonlinearity, power limits, and electrochemical loss.",
    "example": {
      "title": "A source with internal resistance",
      "problem": "A source has emf 12 V and internal resistance $1.0\\,\\Omega$. A $5.0\\,\\Omega$ load is connected. Find current, terminal voltage, load power, and internal loss.",
      "steps": [
        "Total series resistance $R + r = 6.0\\,\\Omega$, so $I = 12/6 = 2.0\\,\\mathrm{A}$.",
        "Terminal voltage is $V = \\varepsilon-Ir = 10\\,\\mathrm{V}$.",
        "$P_{\\mathrm{load}} = I^2 R = 20\\,\\mathrm{W}$ and $P_{\\mathrm{internal}} = I^2 r = 4.0\\,\\mathrm{W}$.",
        "Source check: $\\varepsilon I = 24\\,\\mathrm{W} = 20\\,\\mathrm{W} + 4\\,\\mathrm{W}$."
      ],
      "answer": "$I = 2.0\\,\\mathrm{A}$, $V_{\\mathrm{terminal}} = 10\\,\\mathrm{V}$, $P_{\\mathrm{load}} = 20\\,\\mathrm{W}$, and internal loss is 4.0 W.",
      "check": "The power balance closes, and terminal voltage is below emf during discharge."
    },
    "pitfall": "Maximum load power is not maximum efficiency: at $R_{\\mathrm{load}} = r$, simple-circuit efficiency is only 50%.",
    "practice": [
      {
        "question": "Why does battery voltage sag when a heavy load is connected?",
        "hint": "Include the internal drop Ir.",
        "answer": "A larger current produces greater internal voltage drop and loss, reducing $V_{\\mathrm{terminal}} = \\varepsilon-Ir$."
      },
      {
        "question": "A 9 V source with $r = 0.50\\,\\Omega$ drives $R = 4.0\\,\\Omega$. Find current.",
        "hint": "The resistances are series elements in this model.",
        "answer": "$I = 9/(4.0 + 0.50) = 2.0\\,\\mathrm{A}$."
      }
    ]
  },
  "9.8": {
    "topicId": "9.8",
    "question": "How do circuit topology and finite meter properties determine actual currents and voltages?",
    "overview": [
      "In series, one current passes through every element and voltages add. In parallel, branch voltage is shared and current divides. Kirchhoff's junction rule expresses charge conservation, while its loop rule expresses energy balance in a quasistatic lumped circuit.",
      "An ideal ammeter has zero resistance and is inserted in series; an ideal voltmeter has infinite resistance and is connected in parallel. A real meter changes the circuit: an ammeter adds resistance and a voltmeter draws current. A short circuit bypasses a load with low resistance and can cause dangerous current, heating, and arcing."
    ],
    "conceptExplanations": [
      "Equivalent series resistance is a sum, while parallel conductances add; these rules follow from common current or common branch voltage.",
      "Signed currents sum to zero at a junction, and signed potential changes sum to zero around a closed loop when inductive effects are negligible.",
      "Input resistance and bandwidth set loading and dynamic error, so a reading belongs to the modified circuit rather than an ideally undisturbed object.",
      "A fuse or breaker limits overcurrent consequences but does not make contact safe; hazard also depends on voltage, body path, duration, and contact conditions."
    ],
    "boundary": "Lumped-circuit laws require dimensions much smaller than signal wavelength and negligible distributed fields; at high frequency, wires have inductance, capacitance, propagation delay, and radiation.",
    "example": {
      "title": "Divider loading error",
      "problem": "Two $10\\,\\mathrm{k}\\Omega$ resistors divide 5.0 V. Voltage across the lower resistor is measured by a voltmeter with $10\\,\\mathrm{k}\\Omega$ input resistance. Find its reading.",
      "steps": [
        "Without the meter, the ideal divider would give 2.5 V.",
        "The meter parallels the lower resistor: $10\\,\\mathrm{k}\\Omega \\parallel 10\\,\\mathrm{k}\\Omega = 5.0\\,\\mathrm{k}\\Omega$.",
        "The loaded divider gives $V = 5.0 \\times 5/(10 + 5) = 1.67\\,\\mathrm{V}$."
      ],
      "answer": "The meter reads about 1.67 V and substantially changes the measured circuit.",
      "check": "The effective lower branch decreased, so its fraction of total voltage must fall below one half."
    },
    "pitfall": "Never connect an ammeter directly in parallel with a source: its low resistance creates a near short circuit.",
    "practice": [
      {
        "question": "Why should a good voltmeter have high input resistance?",
        "hint": "Estimate current it draws from the measured node.",
        "answer": "High resistance reduces additional current and therefore reduces disturbance of the original circuit voltage."
      },
      {
        "question": "Resistors $6\\,\\Omega$ and $3\\,\\Omega$ are parallel. Find equivalent resistance.",
        "hint": "Add the conductances: $1/R_{\\mathrm{eq}}=1/6+1/3$.",
        "answer": "$1/R_{\\mathrm{eq}}=1/2$, so $R_{\\mathrm{eq}}=2\\,\\Omega$."
      }
    ]
  },
  "9.9": {
    "topicId": "9.9",
    "question": "Why can one RC network smooth slow changes, reject a constant component, or approximately integrate and differentiate a signal?",
    "overview": [
      "Ideal-capacitor voltage cannot jump because $Q=CV$ and finite current moves finite charge. After a step, it approaches a new state exponentially with time constant $\\tau = RC$; after one $\\tau$, the remaining departure falls to $e^{-1}$.",
      "Taking output across the capacitor gives a low-pass filter: slow components charge it while fast components are attenuated. Output across the resistor rejects DC and gives a high-pass filter. In limiting frequency ranges relative to 1/RC, these circuits approximate integration or differentiation, but not over all frequencies."
    ],
    "conceptExplanations": [
      "For charging from an ideal step, $V_{\\mathrm{C}}(t) = V_{\\mathrm{final}} + [V_{\\mathrm{C}}(0)-V_{\\mathrm{final}}]\\exp(-t/RC)$; for discharge, the final value is often zero.",
      "$\\tau$ has units seconds and sets a scale rather than full completion time: after $5\\tau$, about 0.7% remains.",
      "The exponential follows from a first-order linear equation in which change rate is proportional to remaining departure.",
      "When input varies much faster than RC, capacitor voltage follows accumulated charge and gives an integrating approximation; resistor voltage under slow variation can be proportional to the input derivative.",
      "The first-order cutoff $f_{\\mathrm{c}} = 1/(2 \\pi RC)$ gives amplitude $1/\\sqrt2$ of the low- or high-frequency limiting value."
    ],
    "boundary": "A simple RC model needs linear lumped R and C, ideal connections, and a source of known resistance; leakage, parasitic inductance, amplifier limits, and frequency-dependent components alter the transient.",
    "example": {
      "title": "Charging after two time constants",
      "problem": "A series network $R = 10\\,\\mathrm{k}\\Omega$ and $C = 100\\,\\mu\\mathrm{F}$ is connected to an ideal 5.0 V step with an initially uncharged capacitor. Find $\\tau$, V_C after 2.0 s, and low-pass cutoff.",
      "steps": [
        "$\\tau = RC = 10000 \\times 100 \\times 10^{-6} = 1.0\\,\\mathrm{s}$.",
        "$V_{\\mathrm{C}}(t) = 5[1 - \\exp(-t/\\tau)]$, so $V_{\\mathrm{C}}(2.0\\,\\mathrm{s}) = 5[1 - \\exp(-2)] = 4.32\\,\\mathrm{V}$.",
        "$f_{\\mathrm{c}} = 1/(2 \\pi \\tau) = 0.159\\,\\mathrm{Hz}$."
      ],
      "answer": "$\\tau=1.0\\,\\mathrm{s}$, $V_C(2.0\\,\\mathrm{s})=4.32\\,\\mathrm{V}$, and $f_{\\mathrm c}=0.159\\,\\mathrm{Hz}$.",
      "check": "After $2\\tau$, $\\exp(-2)$, about 13.5%, of the initial departure from final voltage remains."
    },
    "pitfall": "A time constant does not mean charging completes after $\\tau$; only about 63.2% of the full change has occurred.",
    "practice": [
      {
        "question": "Why does a low-pass RC output across the capacitor pass a constant voltage?",
        "hint": "Consider steady current through the capacitor after charging ends.",
        "answer": "At steady state current is zero, resistor drop vanishes, and the entire constant input appears across the capacitor."
      },
      {
        "question": "For $R = 2.0\\,\\mathrm{k}\\Omega$ and $C = 50\\,\\mu\\mathrm{F}$, find $\\tau$.",
        "hint": "Convert prefixes and multiply R by C.",
        "answer": "$\\tau = 2000 \\times 50 \\times 10^{-6} = 0.10\\,\\mathrm{s}$."
      }
    ]
  },
  "10.1": {
    "topicId": "10.1",
    "question": "How can a magnetic field change charge motion direction without changing kinetic energy?",
    "overview": [
      "Magnetic field B is defined through the transverse part of Lorentz force, $F = q(E + v \\times B)$. Unlike an electric field, a static B acts only on moving charge. Current fields are tied to moving charges and depend on reference frame, while electric and magnetic components form one electromagnetic field.",
      "The vector $\\mathbf v\\times\\mathbf B$ is perpendicular to velocity, so a purely magnetic force changes momentum direction but has zero instantaneous power $\\mathbf F\\cdot\\mathbf v$. Magnetic field lines have no beginning or end: they close for localized sources and may extend to infinity in an ideal uniform field; B flux through every closed surface is zero."
    ],
    "conceptExplanations": [
      "Cutting a bar magnet makes two smaller dipoles rather than isolated north and south poles; absence of observed monopoles is expressed by $\\nabla\\cdot B = 0$ in classical theory.",
      "A slowly moving point charge creates a magnetic contribution circling its motion; relativistic motion requires the complete retarded field law.",
      "The electric term qE is independent of v, while $q\\mathbf v\\times\\mathbf B$ depends on velocity and reverses with charge sign.",
      "The right-hand rule gives $\\mathbf v\\times\\mathbf B$ for positive charge; negative charge reverses force direction, while magnetic work remains zero."
    ],
    "boundary": "The form $q(\\mathbf E+\\mathbf v\\times\\mathbf B)$ applies to a point particle in a prescribed local field; extended bodies require integration over charge and current, while radiation and self-force of an accelerated charge need additional modeling.",
    "example": {
      "title": "Transverse force on a proton",
      "problem": "A proton travels at $2.0 \\times 10^{6}\\,\\mathrm{m/s}$ along +x in a uniform 0.20 T field along +z. There is no electric field. Find force magnitude and direction; $e = 1.602 \\times 10^{-19}\\,\\mathrm{C}$.",
      "steps": [
        "Velocity is perpendicular to B, so $F=qvB$.",
        "$F = 1.602 \\times 10^{-19} \\times 2.0 \\times 10^{6} \\times 0.20 = 6.41 \\times 10^{-14}\\,\\mathrm{N}$.",
        "For positive charge, +x cross +z equals -y, so force points along -y."
      ],
      "answer": "$F = 6.41 \\times 10^{-14}\\,\\mathrm{N}$ along -y.",
      "check": "$\\mathbf F\\cdot\\mathbf v = 0$, so the force bends the path without changing proton speed magnitude."
    },
    "pitfall": "The right-hand rule directly gives force direction only for positive charge; reverse it for an electron.",
    "practice": [
      {
        "question": "Why can a uniform magnetic field not accelerate a charge initially at rest?",
        "hint": "Put $v = 0$ into the magnetic Lorentz term.",
        "answer": "At $v = 0$, $\\mathbf v\\times\\mathbf B$ is zero, so no magnetic force acts; an electric field or another force is needed to start motion."
      },
      {
        "question": "A $3.0\\,\\mu\\mathrm{C}$ charge moves perpendicular to $B = 0.50\\,\\mathrm{T}$ at 40 m/s. Find force magnitude.",
        "hint": "Use $F=|q|vB$.",
        "answer": "$F = 3.0 \\times 10^{-6} \\times 40 \\times 0.50 = 6.0 \\times 10^{-5}\\,\\mathrm{N}$."
      }
    ]
  },
  "10.2": {
    "topicId": "10.2",
    "question": "How does Lorentz-force geometry turn a uniform magnetic field into a velocity selector and mass-to-charge analyzer?",
    "overview": [
      "Velocity perpendicular to uniform B experiences centripetal force and forms a circle of radius $r=p_\\perp/(|q|B)$. The parallel component is unchanged, so general motion is helical. In the nonrelativistic limit, cyclotron angular frequency $\\omega_{\\mathrm{c}} = |q|B/m$ is speed-independent.",
      "In crossed E and B fields, particles with $v = E/B$ in the proper direction pass undeflected. After velocity selection, magnetic radius reveals m/|q| for mass spectrometry. A cyclotron synchronizes electric acceleration with orbital motion, and a magnetosphere guides charged particles along field lines."
    ],
    "conceptExplanations": [
      "For $v_\\perp$, field continuously turns velocity into a circle; unchanged $v_\\parallel$ carries the circle center along B to produce a helix.",
      "The frequency $|q|B/(2\\pi m)$ assumes constant B and nonrelativistic momentum mv; it decreases as relativistic energy grows.",
      "When qE and $q\\mathbf v\\times\\mathbf B$ are equal and opposite, total transverse force vanishes; E/B has units speed.",
      "A mass spectrometer separates ions by $m/q$, a cyclotron adds energy through electric field, and a nonuniform magnetosphere can reflect particles through magnetic mirroring."
    ],
    "boundary": "The circular radius $r = mv/(|q|B)$ and speed-independent cyclotron frequency require uniform field, v much less than c, and negligible loss; collisions, B gradients, and radiation alter the motion.",
    "example": {
      "title": "A proton orbit in a magnetic field",
      "problem": "A proton at $1.0 \\times 10^{6}\\,\\mathrm{m/s}$ enters perpendicular to $B = 0.50\\,\\mathrm{T}$. Use $m_{\\mathrm{p}} = 1.673 \\times 10^{-27}\\,\\mathrm{kg}$ and $e = 1.602 \\times 10^{-19}\\,\\mathrm{C}$. Find radius and orbital frequency.",
      "steps": [
        "From $|q|vB=mv^2/r$, $r = mv/(|q|B)$.",
        "$r = 1.673 \\times 10^{-27} \\times 1.0 \\times 10^{6}/(1.602 \\times 10^{-19} \\times 0.50) = 2.09 \\times 10^{-2}\\,\\mathrm{m}$.",
        "$f_{\\mathrm{c}} = |q|B/(2 \\pi m) = 7.62 \\times 10^{6}\\,\\mathrm{Hz}$."
      ],
      "answer": "$r = 2.09\\,\\mathrm{cm}$ and $f_{\\mathrm{c}} = 7.62\\,\\mathrm{MHz}$.",
      "check": "Doubling speed would double radius but leave frequency unchanged in this nonrelativistic model."
    },
    "pitfall": "The magnetic field does not supply cyclotron kinetic energy; electric field in the gaps accelerates the particle.",
    "practice": [
      {
        "question": "What happens to helical pitch if $v_\\parallel$ increases at unchanged $v_\\perp$ and B?",
        "hint": "Orbital period stays fixed and axial distance per period is $v_\\parallel$ T.",
        "answer": "Radius remains fixed and pitch increases in proportion to $v_\\parallel$."
      },
      {
        "question": "A selector has $E = 3.0 \\times 10^{4}\\,\\mathrm{V}/m$ and $B = 0.20\\,\\mathrm{T}$. What speed passes undeflected?",
        "hint": "For perpendicular fields, $v = E/B$.",
        "answer": "$v = 1.5 \\times 10^{5}\\,\\mathrm{m/s}$."
      }
    ]
  },
  "10.3": {
    "topicId": "10.3",
    "question": "How does current geometry determine magnetic-field symmetry and the choice between Biot-Savart and Ampere laws?",
    "overview": [
      "Every steady-current element contributes to B in a direction set by the cross product of path element with direction toward the observation point. The Biot-Savart integral applies to any prescribed geometry, though evaluation may be difficult. A straight wire, circular loop, and long solenoid provide characteristic fields.",
      "Circulation of B around a closed path is connected to enclosed current by Ampere's law in magnetostatics. It is most useful with cylindrical or toroidal symmetry, where B can leave the integral. Parallel currents in the same direction attract because each wire feels force in the other's field."
    ],
    "conceptExplanations": [
      "Around a long straight wire, B lines are circles; on a loop axis, field follows its normal; inside a long densely wound solenoid, field is nearly uniform.",
      "Biot-Savart adds directed contributions $I\\,d\\mathbf l\\times\\hat{\\mathbf r}/r^2$ and assumes steady current in its simple magnetostatic form.",
      "The relation $\\oint \\mathbf B \\cdot d\\mathbf l = \\mu_{0} I_{\\mathrm{enc}}$ directly finds B only when symmetry fixes its direction and constant magnitude on the selected path.",
      "Force on a second wire element is $I\\,d\\mathbf l\\times\\mathbf B$ from the first wire; reversing one current changes attraction to repulsion."
    ],
    "boundary": "Long-wire and ideal-solenoid formulas neglect ends and finite cross-sections; magnetostatic laws without displacement current require steady currents and a quasistatic regime.",
    "example": {
      "title": "Field of a long straight wire",
      "problem": "A long straight wire carries 10 A. Find B at 5.0 cm in vacuum; $\\mu_{0} = 4\\pi \\times 10^{-7}\\,\\mathrm{H/m}$.",
      "steps": [
        "Cylindrical symmetry makes B tangential and constant around a circle of radius r.",
        "Ampere's law gives $B 2 \\pi r = \\mu_{0} I$.",
        "$B = \\mu_{0} I/(2 \\pi r) = 4.0 \\times 10^{-5}\\,\\mathrm{T}$."
      ],
      "answer": "$B = 40\\,\\mu\\mathrm{T}$, tangent to the circle by the right-hand rule.",
      "check": "Field falls as 1/r, and its magnitude is comparable in order to Earth's magnetic field."
    },
    "pitfall": "An Amperian path can always be drawn, but it does not always compute B: without symmetry, the unknown field cannot leave the integral.",
    "practice": [
      {
        "question": "Why is the outside field of an ideal long solenoid small although every turn produces outside field?",
        "hint": "Add directions from many neighboring turns.",
        "answer": "Outside contributions largely cancel while inside contributions reinforce; cancellation is incomplete for a finite solenoid."
      },
      {
        "question": "How does long-wire B change if current doubles and distance triples?",
        "hint": "B is proportional to $I/r$.",
        "answer": "It becomes 2/3 of the original field."
      }
    ]
  },
  "10.4": {
    "topicId": "10.4",
    "question": "How does magnetic moment turn current into mechanical torque, and why does a magnetic material retain or nearly lose magnetization?",
    "overview": [
      "A planar current loop has magnetic dipole moment $\\mu = NIA \\hat{\\mathbf n}$. In uniform field, net force can vanish while a force pair creates torque $\\tau = \\mu \\times B$ tending to align $\\mu$ with B. A motor sustains directed torque by switching current or field as rotation proceeds.",
      "Material response arises from orbital and spin magnetic moments. Diamagnetism opposes applied field, paramagnetic moments weakly align with it, and exchange interaction in a ferromagnet creates collectively ordered domains. Domain-wall motion produces nonlinearity and hysteresis."
    ],
    "conceptExplanations": [
      "Vector $\\mu$ follows the current right-hand rule, and its magnitude $NIA$ grows with turn count, current, and area.",
      "Torque magnitude $\\mu B \\sin\\theta$ is greatest at perpendicular orientation and zero when aligned, although aligned states can be stable or unstable.",
      "Diamagnetism occurs in all materials, paramagnetism requires uncompensated moments, and ferromagnetism produces spontaneous order below a Curie temperature.",
      "Domains reduce external magnetic energy, while a hysteresis loop shows remanent magnetization and energy loss during a field cycle.",
      "Motor conductor forces create torque, and rotational back emf reflects conversion of electrical into mechanical energy."
    ],
    "boundary": "The loop dipole formula assumes loop size small compared with the B variation scale; linear permeability fails near saturation, with hysteresis, and under strong frequency or temperature dependence.",
    "example": {
      "title": "Torque on a multiturn loop",
      "problem": "A loop has $N = 100$ turns, area $2.0 \\times 10^{-3}\\,\\mathrm{m^2}$ per turn, and current 0.50 A. It lies in $B = 0.20\\,\\mathrm{T}$ with a 30 degree angle between loop normal and B. Find $\\mu$ and torque.",
      "steps": [
        "$\\mu = NIA = 100 \\times 0.50 \\times 2.0 \\times 10^{-3} = 0.10\\,\\mathrm{A} m^2$.",
        "$\\tau = \\mu B \\sin(\\theta)$.",
        "$\\tau = 0.10 \\times 0.20 \\times \\sin(30^{\\circ}) = 1.0 \\times 10^{-2}\\,\\mathrm{N m}$."
      ],
      "answer": "$\\mu = 0.10\\,\\mathrm{A} m^2$ and $\\tau = 0.010\\,\\mathrm{N m}$.",
      "check": "At $\\theta = 0$ torque vanishes, while at 90 degrees it would be twice as large."
    },
    "pitfall": "A ferromagnet in zero external field need not have maximum external magnetization; differently oriented domains can nearly cancel in total.",
    "practice": [
      {
        "question": "Why use a transformer core with a narrow hysteresis loop?",
        "hint": "Loop area is related to energy lost per cycle.",
        "answer": "A narrow loop reduces hysteresis loss and heating under repeated magnetization reversal."
      },
      {
        "question": "How does maximum loop torque change if current is tripled?",
        "hint": "$\\tau_{\\mathrm{max}} = N I A B$.",
        "answer": "Maximum torque triples."
      }
    ]
  },
  "10.5": {
    "topicId": "10.5",
    "question": "How do a changing magnetic field and conductor motion produce emf, and how does Lenz's law preserve energy balance?",
    "overview": [
      "Magnetic flux $\\Phi_{\\mathrm B}=\\int \\mathbf B\\cdot d\\mathbf S$ counts the normal component of $\\mathbf B$ through an oriented surface. For a fixed contour, Maxwell–Faraday law connects electric-field circulation to a time-varying B: $\\oint \\mathbf E\\cdot d\\mathbf l=-d\\Phi_{\\mathrm B}/dt$. For a moving or deforming conducting loop, total emf includes the magnetic Lorentz term: $\\mathcal E=\\oint(\\mathbf E+\\mathbf u\\times\\mathbf B)\\cdot d\\mathbf l=-d\\Phi_{\\mathrm B}/dt$.",
      "The minus sign is Lenz's law: induced current produces a magnetic effect opposing flux change, not necessarily the original field. A mechanical generator therefore feels opposing torque under load. Closed eddy currents in bulk conductors heat material and create forces; lamination suppresses them, while braking and induction heating exploit them."
    ],
    "conceptExplanations": [
      "Flux depends on selected surface orientation; reversing its normal reverses Phi_B and the consistently associated contour direction.",
      "For a fixed path, transformer emf is electric-field circulation and needs no metal wire; conductor motion adds the $\\mathbf u\\times\\mathbf B$ term, while a wire merely permits substantial current.",
      "Opposition to change does not prevent flux growth: an external agent performs extra work that becomes electrical energy and heat.",
      "Eddy currents flow in bulk loops, so slots and insulated laminations limit loop area and reduce loss.",
      "A generator changes coil flux mechanically and thereby converts mechanical work into electrical energy."
    ],
    "boundary": "The simple form $-N\\,d\\Phi/dt$ assumes equal flux through N turns and a defined contour; at high frequency, distributed fields, skin effect, and parasitic capacitance require a full electromagnetic model.",
    "example": {
      "title": "Emf amplitude of a rotating coil",
      "problem": "A coil with $N = 200$ and turn area $5.0 \\times 10^{-3}\\,\\mathrm{m^2}$ rotates at 50 Hz in uniform $B = 0.40\\,\\mathrm{T}$. Its rotation axis is perpendicular to B. Find emf amplitude.",
      "steps": [
        "Flux linkage is $N\\Phi_{\\mathrm B} = NBA \\cos(\\omega t)$, so the flux rule gives $\\mathcal E_{\\mathrm{max}}=NBA\\omega$.",
        "$\\omega = 2 \\pi f = 314\\,\\mathrm{rad/s}$.",
        "$\\mathcal E_{\\mathrm{max}} = 200 \\times 0.40 \\times 5.0 \\times 10^{-3} \\times 314 = 126\\,\\mathrm{V}$."
      ],
      "answer": "Emf amplitude is approximately 126 V.",
      "check": "Doubling rotation frequency would double flux-change rate and emf amplitude."
    },
    "pitfall": "Induction depends on flux change, not on a large constant flux: a stationary coil in a constant uniform field can have zero emf.",
    "practice": [
      {
        "question": "Which way does current flow if outward magnetic flux through the page increases?",
        "hint": "Induced field must oppose the increase.",
        "answer": "The coil creates field into the page, so the right-hand rule gives clockwise current."
      },
      {
        "question": "One-turn flux falls uniformly from 8 to 2 mWb in 0.030 s. Find average emf magnitude.",
        "hint": "Use $|\\Delta\\Phi|/\\Delta t$.",
        "answer": "$|\\mathcal E| = 6.0 \\times 10^{-3}/0.030 = 0.20\\,\\mathrm{V}$."
      }
    ]
  },
  "10.6": {
    "topicId": "10.6",
    "question": "How does inductance store energy, delay current change, and create frequency resonance with capacitance?",
    "overview": [
      "Changing a coil's own current changes linked magnetic flux and creates self-induced emf opposing that change. For a linear coil, flux linkage is LI, voltage is related to $L\\,dI/dt$, and magnetic-field energy is $LI^2/2$. In an RL circuit, current changes on scale $L/R$.",
      "In an ideal LC circuit, energy alternates between capacitor electric field and coil magnetic field at $\\omega_{0} = 1/\\sqrt{LC}$. Resistance dissipates energy and limits RLC resonance. Reactive elements create phase shifts in AC. A transformer uses shared alternating flux to raise voltage while lowering current at approximately conserved power."
    ],
    "conceptExplanations": [
      "Inductance depends on geometry and magnetic medium; ideal finite L forbids an instantaneous current jump without infinite voltage.",
      "An RL transient approaches steady current, while an ideal LC circuit oscillates; real resistance turns free oscillation into decay.",
      "In a series RLC circuit at $\\omega L = 1/(\\omega C)$, reactive voltages cancel in the sum and impedance is minimal, although each voltage may be large.",
      "Resistor current and voltage are in phase, ideal-L current lags, and ideal-C current leads; total angle follows the combined impedance.",
      "An ideal transformer obeys $V_{2}/V_{1} = N_{2}/N_{1}$ and $I_{2}/I_{1} = N_{1}/N_{2}$; steady DC after the transient creates no changing flux and is not transformed."
    ],
    "boundary": "Ideal RLC and transformer formulas assume linear lumped elements, sinusoidal operation, and weak parasitics; core saturation, loss, leakage flux, and high-frequency radiation alter response.",
    "example": {
      "title": "Series RLC resonance",
      "problem": "A series circuit has $L = 0.10\\,\\mathrm{H}$, $C = 100\\,\\mu\\mathrm{F}$, and $R = 10\\,\\Omega$. Find ideal resonance frequency and estimate $Q = \\omega_{0} L/R$.",
      "steps": [
        "$\\omega_{0} = 1/\\sqrt{LC} = 1/\\sqrt{0.10 \\times 100 \\times 10^{-6}} = 316\\,\\mathrm{rad/s}$.",
        "$f_{0} = \\omega_{0}/(2 \\pi) = 50.3\\,\\mathrm{Hz}$.",
        "$Q = \\omega_{0} L/R = 316 \\times 0.10/10 = 3.16$."
      ],
      "answer": "$f_{0} = 50.3\\,\\mathrm{Hz}$ and Q is about 3.16.",
      "check": "LC has units s^2, and increasing R lowers Q without changing ideal f0."
    },
    "pitfall": "Resonance does not mean zero voltage on L and C: their sum can cancel while each voltage is large.",
    "practice": [
      {
        "question": "Why can opening a circuit with a large inductance create high voltage?",
        "hint": "The coil opposes rapid current change through $L\\,dI/dt$.",
        "answer": "Trying to force current rapidly to zero creates a large self-induced emf, enough for a spark or breakdown without a protective path."
      },
      {
        "question": "An ideal transformer has $N_{2}/N_{1} = 5$ and $V_{1} = 24\\,\\mathrm{V}$. Find V2.",
        "hint": "$V_{2}/V_{1} = N_{2}/N_{1}$.",
        "answer": "$V_{2} = 120\\,\\mathrm{V}$."
      }
    ]
  },
  "10.7": {
    "topicId": "10.7",
    "question": "How do four field laws predict a wave that propagates through vacuum and transports energy?",
    "overview": [
      "Maxwell's equations connect electric flux to charge, exclude net magnetic charge in the classical field, connect circulating E to changing magnetic flux, and connect circulating B to current plus changing electric flux. Displacement current makes Ampere's law consistent with charge conservation, including between charging capacitor plates.",
      "In free space, changing E and B satisfy wave equations with speed $c = 1/\\sqrt{\\mu_{0} \\varepsilon_{0}}$. In a plane wave, fields are mutually perpendicular and transverse to propagation, with $B = E/c$. Frequency selects the spectrum band, but every vacuum component has the same speed; the Poynting vector gives energy flux."
    ],
    "conceptExplanations": [
      "Two equations describe sources through fluxes and two describe field circulation under changing flux of the other field; with Lorentz force they form classical electrodynamics.",
      "The term $\\varepsilon_0\\,d\\Phi_{\\mathrm E}/dt$ produces magnetic circulation where no conduction current crosses a selected surface, preserving surface-independent results.",
      "Self-sustaining does not mean a time-ordered chain E then B then E at one point; both fields are one joint solution with boundary conditions.",
      "The values $\\mu_0$ and $\\varepsilon_0$ determine classical vacuum wave speed, and c is also the invariant limiting speed in special relativity.",
      "Radio, microwave, infrared, visible, ultraviolet, X-ray, and gamma radiation differ in frequency and matter interaction, not in vacuum-field nature.",
      "$\\mathbf S=\\mathbf E\\times\\mathbf H$ points along energy transport, and its surface integral gives electromagnetic power crossing that surface."
    ],
    "boundary": "$B = E/c$ and $\\langle S\\rangle = \\varepsilon_{0} c E_{0}^2/2$ describe a sinusoidal plane wave in vacuum; antenna near fields, guiding media, dispersion, and absorption require different geometry and material relations.",
    "example": {
      "title": "Fields and intensity of a plane wave",
      "problem": "A sinusoidal plane wave in vacuum has electric amplitude $E_{0} = 300\\,\\mathrm{V}/m$. Find B0 and mean intensity. Use $c = 2.998 \\times 10^{8}\\,\\mathrm{m/s}$ and $\\varepsilon_{0} = 8.854 \\times 10^{-12}\\,\\mathrm{F/m}$.",
      "steps": [
        "$B_{0} = E_{0}/c = 300/(2.998 \\times 10^{8}) = 1.00 \\times 10^{-6}\\,\\mathrm{T}$.",
        "Mean intensity is $\\langle S\\rangle = \\varepsilon_{0} c E_{0}^2/2$.",
        "Substitution gives $\\langle S\\rangle\\approx119\\,\\mathrm{W/m^2}$."
      ],
      "answer": "$B_0 \\approx 1.00\\,\\mu\\mathrm{T}$ and mean intensity is about $119\\,\\mathrm{W/m^2}$.",
      "check": "$E_0/B_0$ equals c, and $\\mathbf E\\times\\mathbf B$ points along propagation."
    },
    "pitfall": "An electromagnetic wave needs no material medium; $\\mu_0$ and $\\varepsilon_0$ in the vacuum formula are not mechanical properties of an ether.",
    "practice": [
      {
        "question": "Why is displacement current needed in a charging-capacitor gap?",
        "hint": "One loop bounds both a surface crossing the wire and a surface passing between plates.",
        "answer": "Changing electric flux between plates supplies the same magnetic effect as conduction current in the wire, making the law independent of surface choice."
      },
      {
        "question": "What is the vacuum wavelength of a 100 MHz radio signal?",
        "hint": "Use $\\lambda = c/f$.",
        "answer": "$\\lambda = \\frac{2.998 \\times 10^{8}}{1.00 \\times 10^{8}} \\approx 3.00\\,\\mathrm{m}$."
      }
    ]
  },
  "11.1": {
    "topicId": "11.1",
    "question": "When may light be replaced by rays, and how does stationary optical time lead to reflection and image construction?",
    "overview": [
      "A ray gives energy-flow direction when wavelength is much smaller than obstacles and medium-variation scales. In a homogeneous transparent medium, the ray is straight. An extended source and opaque object produce an umbra reached by no source rays and a penumbra reached by only part of the source.",
      "At a stationary smooth reflector, reflection angle equals incidence angle, both measured from the normal. Backward extensions of reflected rays from a plane mirror meet at a virtual image behind it. More generally, a physical ray makes optical travel time stationary under nearby path variations; a stationary value may be a minimum, maximum, or saddle."
    ],
    "conceptExplanations": [
      "Straight propagation is the short-wavelength limit of wave propagation; near an edge on the $\\lambda$ scale, diffraction smooths the sharp geometrical boundary.",
      "A point source gives an ideal sharp shadow, while every point of an extended source produces its own boundary and their sum makes a penumbra.",
      "Tangential phase matching and reversibility give equal angles relative to the local normal, not relative to the surface.",
      "A plane mirror forms an upright virtual image of equal transverse size at equal perpendicular distance behind the plane.",
      "The condition $\\delta \\int n ds = 0$ selects a stationary optical path; 'light always takes the fastest path' is not generally correct."
    ],
    "boundary": "Geometrical optics requires wavelength much smaller than apertures and medium-variation radii; rough surfaces, diffraction, and coherent interference require a wave model, while Fermat's principle concerns stationary admissible path variations.",
    "example": {
      "title": "Image in a plane mirror",
      "problem": "A point object is 0.75 m in front of a plane mirror. Where does an observer locate it, and what is object-image separation?",
      "steps": [
        "Extend reflected rays backward behind the mirror; their extensions meet at the point symmetric to the object.",
        "The image is 0.75 m behind the mirror and is virtual.",
        "Object-image separation is $0.75 + 0.75 = 1.50\\,\\mathrm{m}$."
      ],
      "answer": "The virtual image is 0.75 m behind the mirror, separated from the object by 1.50 m.",
      "check": "If the object approaches by $\\Delta x$, its image symmetrically approaches by $\\Delta x$ and their separation falls by 2 $\\Delta x$."
    },
    "pitfall": "A virtual image is not on the mirror surface: the eye locates it where backward ray extensions meet behind the mirror.",
    "practice": [
      {
        "question": "Why is the edge of a Sun-cast shadow usually not perfectly sharp?",
        "hint": "The Sun has finite angular size, so its points illuminate the edge differently.",
        "answer": "An extended source creates a penumbra where part of its disk is hidden and part remains visible; diffraction may add finer blurring."
      },
      {
        "question": "A ray strikes at 28 degrees to a mirror normal. What is reflection angle?",
        "hint": "Both angles are measured from the same normal.",
        "answer": "The reflection angle is 28 degrees."
      }
    ]
  },
  "11.2": {
    "topicId": "11.2",
    "question": "Why does a ray turn at a boundary, how does dispersion separate colors, and when does light remain entirely inside a medium?",
    "overview": [
      "Light phase speed in linear matter is usually below c and depends on frequency; $n=c/v_{\\mathrm{ph}}$ characterizes it at a stated frequency. Phase continuity at a stationary boundary preserves frequency and gives Snell's law $n_{1} \\sin(\\theta_{1}) = n_{2} \\sin(\\theta_{2})$, with angles measured from the normal.",
      "Frequency dependence of n is dispersion and sends spectral components along different directions, producing a prism spectrum and contributing with internal reflection to a rainbow. From larger n to smaller n, incidence above $\\theta_{\\mathrm{c}} = \\arcsin(n_{2}/n_{1})$ removes the propagating refracted wave and gives total internal reflection with an evanescent outside field."
    ],
    "conceptExplanations": [
      "The speed $v_{\\mathrm{ph}} = c/n$ belongs to phase in matter; momentum, energy, and short-signal propagation require group velocity, dispersion, and absorption.",
      "Snell's law applies to one frequency and angles from the normal; entering larger n bends a ray toward the normal.",
      "Index may be complex and frequency-dependent; its imaginary part describes absorption absent from a simple ray diagram.",
      "Under normal dispersion, shorter visible wavelengths often have larger n, but rainbow shape also follows droplet geometry and deviation angle, not only white-light splitting.",
      "A fiber guides modes because core n exceeds cladding n, but bends, scattering, absorption, and dispersion produce loss and pulse broadening."
    ],
    "boundary": "Simple Snell's law assumes a planar stationary boundary between homogeneous isotropic media at one frequency; anisotropy, absorption, metamaterials, and wavelength-scale structures require a polarized wave model.",
    "example": {
      "title": "Refraction and glass critical angle",
      "problem": "A ray from air strikes glass of $n = 1.50$ at 30 degrees from normal. Find its glass angle and the critical angle for the reverse glass-to-air path, with $n_{\\mathrm{air}} = 1.00$.",
      "steps": [
        "Snell's law gives $\\sin(\\theta_{2}) = 1.00 \\sin(30^{\\circ})/1.50 = 1/3$, so $\\theta_{2} = 19.5^{\\circ}$.",
        "At critical incidence the refracted ray follows the boundary: $\\sin\\theta_{\\mathrm c}=n_{\\mathrm{air}}/n_{\\mathrm{glass}}=2/3$.",
        "$\\theta_{\\mathrm{c}} = 41.8^{\\circ}$."
      ],
      "answer": "Refraction angle is 19.5 degrees and glass-to-air critical angle is 41.8 degrees.",
      "check": "On entering larger n the ray bent toward normal; total internal reflection is possible only from glass toward air."
    },
    "pitfall": "Total internal reflection cannot occur on entering a higher-index medium, regardless of incidence angle.",
    "practice": [
      {
        "question": "Does monochromatic-light frequency change at a stationary boundary?",
        "hint": "Fields on both sides must share one time phase at the boundary.",
        "answer": "Frequency remains fixed; phase speed and wavelength $\\lambda=v_{\\mathrm{ph}}/f$ change."
      },
      {
        "question": "What is phase speed in a medium of $n = 1.60$ for $c = 3.00 \\times 10^{8}\\,\\mathrm{m/s}$?",
        "hint": "Use $v_{\\mathrm{ph}} = c/n$.",
        "answer": "$v_{\\mathrm{ph}} = 1.875 \\times 10^{8}\\,\\mathrm{m/s}$."
      }
    ]
  },
  "11.3": {
    "topicId": "11.3",
    "question": "How does mirror or lens curvature connect object position to image position, orientation, and scale?",
    "overview": [
      "A spherical mirror redirects rays by reflection from different local normals. A thin lens approximates two refractions by one direction change at its principal plane. A converging system brings a parallel bundle to a real focus, while a diverging system makes a bundle appear to originate from a virtual focus.",
      "Under a consistent sign convention, a paraxial thin lens obeys $1/f = 1/d_{\\mathrm{o}} + 1/d_{\\mathrm{i}}$, with transverse magnification $M = h_{\\mathrm{i}}/h_{\\mathrm{o}} = -d_{\\mathrm{i}}/d_{\\mathrm{o}}$. Positive $d_i$ commonly denotes a real image on the opposite side and negative $d_i$ a virtual one. Ray diagrams check signs and give geometric meaning to calculation."
    ],
    "conceptExplanations": [
      "In the paraxial approximation, a spherical mirror focuses near R/2; rays far from the axis create spherical aberration.",
      "Positive power of a converging lens and negative power of a diverging lens depend on surrounding medium and surfaces; geometry alone does not guarantee the sign in every medium.",
      "Three useful rays—parallel, focal, and through the thin-lens optical center—locate an image in the approximate diagram.",
      "The thin-lens equation requires axial distances and one sign convention; mixing signed distances with unsigned magnitudes creates false answers.",
      "The minus in $M = -d_{\\mathrm{i}}/d_{\\mathrm{o}}$ records inversion for ordinary positive $d_o$ and $d_i$, while $|M|$ is the size ratio."
    ],
    "boundary": "The thin paraxial model requires lens thickness and aperture small relative to characteristic distances, near-axis rays, and weak aberrations; a wide-angle or thick system needs transfer matrices or surface ray tracing.",
    "example": {
      "title": "Image from a converging lens",
      "problem": "A thin converging lens has $f = +0.10\\,\\mathrm{m}$. An object is at $d_{\\mathrm{o}} = +0.30\\,\\mathrm{m}$. Find $d_i$ and magnification under the stated convention.",
      "steps": [
        "$1/d_{\\mathrm{i}} = 1/f - 1/d_{\\mathrm{o}} = 10 - 3.333 = 6.667 1/m$.",
        "$d_{\\mathrm{i}} = +0.150\\,\\mathrm{m}$, so the image is real and lies beyond the lens.",
        "$M = -d_{\\mathrm{i}}/d_{\\mathrm{o}} = -0.150/0.30 = -0.50$."
      ],
      "answer": "$d_{\\mathrm{i}} = +0.150\\,\\mathrm{m}$ and $M = -0.50$: the image is real, inverted, and half-size.",
      "check": "An object beyond 2f should form a reduced image between f and 2f, matching the calculation."
    },
    "pitfall": "A focus is not a point traversed by every ray; in an ideal system it receives a paraxial bundle parallel to the corresponding axis.",
    "practice": [
      {
        "question": "What image does a converging lens form for an object inside focal distance?",
        "hint": "The equation gives $d_i<0$.",
        "answer": "The image is virtual, upright, and usually enlarged; outgoing diverging rays meet only when extended backward."
      },
      {
        "question": "For $f = +20\\,\\mathrm{cm}$ and $d_{\\mathrm{o}} = +60\\,\\mathrm{cm}$, find $d_i$.",
        "hint": "Use $1/d_{\\mathrm{i}} = 1/f - 1/d_{\\mathrm{o}}$.",
        "answer": "$1/d_{\\mathrm{i}} = 1/20 - 1/60 = 1/30\\,\\mathrm{cm}^-1$, so $d_{\\mathrm{i}} = +30\\,\\mathrm{cm}$."
      }
    ]
  },
  "11.4": {
    "topicId": "11.4",
    "question": "How does one image-formation scheme become an eye, camera, microscope, or telescope, and what limits are set by aperture and aberration?",
    "overview": [
      "The eye and camera must form a real image on a fixed surface: retina or sensor. A camera focuses by moving elements, while the eye primarily changes lens power through accommodation. Myopia and hyperopia are corrected so the combined system again focuses accessible objects on the retina.",
      "An aperture controls light flux and ray angles: a smaller opening increases geometrical depth of field but strengthens diffraction. Exposure time changes collected energy and motion blur. Microscopes and telescopes give angular magnification through objective and eyepiece combinations, but resolution is set by aperture, wavelength, aberrations, and detector."
    ],
    "conceptExplanations": [
      "The optics creates an irradiance distribution on a photosensitive surface, while brain or electronics interprets it; the retina is not a screen containing completed perception.",
      "Accommodation changes distance focus; myopia commonly needs a diverging correction and hyperopia a converging correction for the relevant viewing range.",
      "F-number $N = f/D$ connects focal length and entrance-pupil diameter; stopping down reduces light and geometrical blur, but too small D broadens diffraction.",
      "Angular magnification compares angles subtended with and without an instrument, not merely linear size of an intermediate image.",
      "Spherical and chromatic aberration, coma, and astigmatism depend on field and spectrum; combining surfaces and materials reduces them but not with one adjustment for all conditions."
    ],
    "boundary": "The thin-lens instrument scheme is a paraxial monochromatic approximation; real image quality needs a point-spread function including diffraction, aberrations, pixel size, motion, and signal processing.",
    "example": {
      "title": "Refocusing a camera from infinity",
      "problem": "A thin objective has $f = 50.0\\,\\mathrm{mm}$. How far behind it should a sensor be for an object at 2.00 m, and how much farther is that than infinity focus?",
      "steps": [
        "In metres, $1/d_{\\mathrm{i}} = 1/0.0500 - 1/2.00 = 19.5 1/m$.",
        "$d_{\\mathrm{i}} = 0.05128\\,\\mathrm{m} = 51.28\\,\\mathrm{mm}$.",
        "At infinity, $d_{\\mathrm{i}} = f = 50.00\\,\\mathrm{mm}$, so the sensor moves 1.28 mm farther away."
      ],
      "answer": "$d_{\\mathrm{i}} = 51.28\\,\\mathrm{mm}$, a 1.28 mm shift from infinity focus.",
      "check": "A nearer object requires greater image distance, consistent with $d_i>f$."
    },
    "pitfall": "Stopping down does not improve sharpness without limit: after reducing geometrical aberration, diffraction dominates and the signal becomes weaker.",
    "practice": [
      {
        "question": "Why can a telescope enlarge a star's angular image without revealing detail below its diffraction limit?",
        "hint": "Separate enlargement of a formed image from spatial information present in it.",
        "answer": "The eyepiece enlarges angles, but the finite objective already removed excessively high spatial frequencies; empty magnification cannot restore detail."
      },
      {
        "question": "An ideal astronomical telescope has $f_{\\mathrm{objective}} = 800\\,\\mathrm{mm}$ and $f_{\\mathrm{eyepiece}} = 20\\,\\mathrm{mm}$. Find angular-magnification magnitude.",
        "hint": "For normal adjustment, $|M_\\theta|=f_{\\mathrm{objective}}/f_{\\mathrm{eyepiece}}$.",
        "answer": "$|M_{\\theta}| = 40$."
      }
    ]
  },
  "11.5": {
    "topicId": "11.5",
    "question": "How do finite coherence and aperture produce interference fringes, diffraction spots, and a practical resolution limit?",
    "overview": [
      "Interference requires a stable phase difference over observation. In a double slit, indistinguishable coherent paths add by amplitude and far-field maxima obey $d \\sin(\\theta_{\\mathrm{m}}) = m \\lambda$. A broad source or spectrum averages different phases and reduces fringe visibility.",
      "Every finite aperture diffracts: a smaller transverse dimension produces a wider angular distribution. A many-slit grating gives narrow principal maxima, while a circular aperture gives an Airy pattern. The Rayleigh value $\\theta\\approx1.22\\lambda/D$ is a useful convention for distinguishing two equal points, not an absolute ban for every estimation method."
    ],
    "conceptExplanations": [
      "Temporal coherence limits allowed path difference through spectral width, while spatial coherence measures phase consistency across wavefront positions.",
      "Double-slit fringe locations follow path difference d $\\sin\\theta$, while finite width of each slit multiplies fringes by a diffraction envelope.",
      "One slit gives a broad structure and many grating slits reinforce phase-matched directions; spectral resolving power grows with illuminated groove count and order.",
      "Reducing aperture increases angular width approximately as $\\lambda/D$ even if a geometrical ray picture predicts a finer point.",
      "Under Rayleigh, one Airy maximum coincides with the other's first minimum; noise, contrast, prior model, and processing change practical distinguishability."
    ],
    "boundary": "The formula $d \\sin(\\theta_{\\mathrm{m}}) = m \\lambda$ requires monochromatic coherent slits and a far field or focal plane; 1.22 $\\lambda/D$ applies to a uniformly illuminated circular aperture and a chosen resolution criterion.",
    "example": {
      "title": "Double-slit fringe spacing",
      "problem": "Two narrow slits are separated by $d = 0.250\\,\\mathrm{mm}$, wavelength is 500 nm, and a screen is $L = 2.00\\,\\mathrm{m}$ away. Find adjacent-maxima spacing at small angles.",
      "steps": [
        "At small angle, $y_m\\approx L\\sin\\theta_m$, so y_m approximately $m\\lambda L/d$.",
        "Spacing is $\\Delta y = \\lambda L/d$.",
        "$\\Delta y = 500 \\times 10^{-9} \\times 2.00/(0.250 \\times 10^{-3}) = 4.00 \\times 10^{-3}\\,\\mathrm{m}$."
      ],
      "answer": "Adjacent maxima are about 4.00 mm apart.",
      "check": "Larger d compresses fringes, while larger $\\lambda$ or L expands them, as the formula predicts."
    },
    "pitfall": "Diffraction is not only bending at a geometrical edge: the whole complex wavefront across a finite aperture contributes to the far pattern.",
    "practice": [
      {
        "question": "Why do two independent ordinary lamps not produce stable double-source fringes?",
        "hint": "Compare random relative-phase change time with exposure time.",
        "answer": "Their relative phase changes rapidly and randomly, so the cross-interference term averages nearly to zero."
      },
      {
        "question": "Estimate Rayleigh angle for $D = 0.050\\,\\mathrm{m}$ and $\\lambda = 550\\,\\mathrm{nm}$.",
        "hint": "Use $\\theta = 1.22 \\lambda/D$.",
        "answer": "$\\theta \\approx 1.34 \\times 10^{-5}\\,\\mathrm{rad}$, or about 2.8 arcseconds."
      }
    ]
  },
  "11.6": {
    "topicId": "11.6",
    "question": "How do oscillation direction, spectrum, and Doppler shift let us control light and infer matter composition and motion?",
    "overview": [
      "Polarization describes orientation of transverse electric field. An ideal linear polarizer selects one component, and an analyzer at angle $\\theta$ transmits $I = I_{0} \\cos^2(\\theta)$ for already linearly polarized input. Phase delay between orthogonal components creates elliptical and circular polarization.",
      "Color perception follows light spectrum, cone response, and visual processing, so distinct spectra can look identical. Atomic and molecular levels create characteristic absorption and emission lines. Their pattern indicates composition and conditions, while relative line shift reveals radial motion under an appropriate Doppler model."
    ],
    "conceptExplanations": [
      "Unpolarized light has randomly varying transverse-field direction, linear polarization fixes an axis, and circular polarization needs equal orthogonal components separated by phase $\\pi/2$.",
      "Malus's law applies to an ideal analyzer and linearly polarized input; a first polarizer transmits half the mean intensity of ideal unpolarized light.",
      "Additive mixing of light differs from subtractive pigment mixing, and metamerism shows that one perceived color may come from different spectra.",
      "Continuous, line, and band spectra reflect source and light-matter interaction; line width also carries information about temperature, collisions, and motion.",
      "Matching laboratory wavelengths to observed ones identifies elements and molecules, while systematic redshift or blueshift estimates line-of-sight motion."
    ],
    "boundary": "Malus's law requires ideal linear polarizers and a known input state; $\\Delta \\lambda/\\lambda = v_{\\mathrm{r}}/c$ requires |v_r| much less than c and line-of-sight motion, while strong fields, pressure, and cosmological expansion can shift or broaden lines differently.",
    "example": {
      "title": "Intensity after an analyzer",
      "problem": "A linearly polarized beam of intensity 100 W/m^2 reaches an ideal analyzer whose axis is 60 degrees from the polarization direction. Find output intensity.",
      "steps": [
        "For linearly polarized input, use $I = I_{0} \\cos^2(\\theta)$.",
        "$\\cos(60^{\\circ}) = 0.5$, so $\\cos^2(60^{\\circ}) = 0.25$.",
        "$I = 100 \\times 0.25 = 25\\,\\mathrm{W/m^2}$."
      ],
      "answer": "The analyzer transmits 25 W/m^2.",
      "check": "At 0 degrees all ideal input passes and at 90 degrees none passes; this result lies between."
    },
    "pitfall": "Color cannot be assigned uniquely to one wavelength: white, purple, and many display colors are spectral mixtures.",
    "practice": [
      {
        "question": "Why do crossed ideal polarizers transmit almost no linearly polarized light?",
        "hint": "Set $\\theta = 90^{\\circ}$ in Malus's law.",
        "answer": "Electric-field projection on the second axis is zero, so ideal intensity $\\cos^2(90^{\\circ})$ is zero."
      },
      {
        "question": "A 600.0 nm line is observed at 600.2 nm. Estimate small radial speed using $c = 3.00 \\times 10^{8}\\,\\mathrm{m/s}$.",
        "hint": "For a small shift, $v_r/c$ is approximately $\\Delta\\lambda/\\lambda$.",
        "answer": "v_r is approximately $3.00 \\times 10^{8} \\times 0.2/600 = 1.00 \\times 10^{5}\\,\\mathrm{m/s}$; redshift denotes recession under this convention."
      }
    ]
  },
  "12.1": {
    "topicId": "12.1",
    "question": "Why can Galilean velocity addition not be retained together with electrodynamics and the same speed of light for every inertial observer?",
    "overview": [
      "Newtonian kinematics treats time as common to all observers, so changing frames changes a velocity according to u' = u - v. This approximation works extremely well when v is much smaller than c, but applying it to light predicts different light speeds for observers moving relative to one another.",
      "Special relativity changes the rules for relating spatial and temporal coordinates rather than changing electrodynamics. If the laws of physics are the same in every inertial frame and light in vacuum has one speed c, simultaneity, elapsed time, and length cannot all remain absolute; Lorentz transformations relate them."
    ],
    "conceptExplanations": [
      "The Galilean transformation x' = x - vt with t' = t gives u' = u - v. It is the leading low-v/c approximation to the Lorentz transformation, not a separate universal law of nature.",
      "Maxwell's equations set the vacuum speed of an electromagnetic wave through the electric and magnetic constants. Experiment requires c to be treated as an invariant speed, not as a speed relative to a material ether.",
      "The first postulate makes inertial frames equivalent, and the second assigns the same vacuum value c to light in each of them. Together they select Lorentzian rather than Galilean transformations.",
      "One may choose a frame in which a particular object is at rest, but no experimentally distinguished absolute inertial rest frame exists. Acceleration, unlike constant velocity, is detected by an accelerometer and is therefore not merely relative."
    ],
    "boundary": "Special relativity directly describes inertial frames in flat spacetime. Its equations reduce to Galilean results when v/c is much less than one; gravity and extended accelerated frames require general relativity.",
    "example": {
      "title": "A Light Pulse from a Moving Spacecraft",
      "problem": "A spacecraft moves at 0.60c relative to Earth and emits a light pulse forward. Compare the Galilean and relativistic answers for the pulse speed relative to Earth.",
      "steps": [
        "Galilean addition would give u = c + 0.60c = 1.60c, contradicting the invariance of light speed.",
        "For collinear velocities use u = (u' + v)/(1 + u'v/c²).",
        "With u' = c and v = 0.60c, u = 1.60c/(1 + 0.60) = c."
      ],
      "answer": "The Earth observer also measures c; the event coordinates of emission and reception change, not the value of c.",
      "check": "The relativistic expression does not exceed c and approaches ordinary velocity addition for slow objects."
    },
    "pitfall": "The invariance of c does not mean velocities cannot be combined. They must be combined with the fractional relativistic rule, whose correction is negligible at low speeds.",
    "practice": [
      {
        "question": "Can uniform straight-line motion of a sealed laboratory be detected using only experiments performed inside it?",
        "hint": "State the first postulate and distinguish velocity from acceleration.",
        "answer": "No. All inertial frames are equivalent, so an internal experiment cannot reveal an absolute velocity; an accelerometer would reveal only departure from inertial motion."
      },
      {
        "question": "A probe moves at 0.50c and launches a particle forward at 0.80c relative to itself. What is the particle's speed relative to Earth?",
        "hint": "Use u = (u' + v)/(1 + u'v/c²).",
        "answer": "u = (0.80 + 0.50)c/(1 + 0.80·0.50) = 1.30c/1.40 ≈ 0.929c."
      }
    ]
  },
  "12.2": {
    "topicId": "12.2",
    "question": "How can clocks at different locations be compared when the synchronization procedure itself uses a signal with finite speed?",
    "overview": [
      "Distant clocks cannot be compared without a convention for transferring time. In Einstein synchronization, a light signal travels from clock A to clock B and back, and B assigns the arrival event the midpoint of the emission and return readings at A. This definition is natural in an inertial frame where light has the same speed in both directions.",
      "A Lorentz transformation mixes space and time: events simultaneous in one frame are generally not simultaneous in another. A clock present at two events along one worldline measures proper time Δτ; an inertial frame in which that clock moves at speed v assigns Δt = γΔτ between the same events."
    ],
    "conceptExplanations": [
      "Synchronization is a physical procedure, not an assumption of one universal set of clocks. For an A-to-B-to-A exchange with symmetric propagation, B is set to (t₁ + t₂)/2, where t₁ is emission and t₂ is return.",
      "For two events with Δt = 0 and Δx not equal to zero, the transformation gives Δt' = -γvΔx/c². Inertial observers may therefore disagree about the order of spatially separated events without violating causality.",
      "The phrase 'moving clocks run slow' compares one clock's proper time with coordinate time between the same two events in a chosen inertial frame. It does not identify an absolutely moving object.",
      "Proper time is read by one clock present at both events. Along an arbitrary trajectory it is found by integrating dτ = dt√(1 - v²/c²), so it depends on the path between the events."
    ],
    "boundary": "The relation Δt = γΔτ assumes uniform relative motion over the segment and comparison of the same event pair. Proper time on an accelerated path must be accumulated segment by segment; a gravitational field also changes clock rates through the potential and geometry.",
    "example": {
      "title": "Simultaneous Flashes Along a Platform",
      "problem": "In a platform frame, two flashes occur simultaneously 300 m apart. A train moves from the first flash toward the second at 0.60c. Find the time difference between the events in the train frame.",
      "steps": [
        "In the platform frame Δt = 0, Δx = +300 m, and γ = 1/√(1 - 0.60²) = 1.25.",
        "Use Δt' = γ(Δt - vΔx/c²) = -γvΔx/c².",
        "Because 300 m/c ≈ 1.00 μs, Δt' ≈ -1.25·0.60·1.00 μs = -0.75 μs."
      ],
      "answer": "In the train frame, the forward flash occurs about 0.75 μs before the rear flash.",
      "check": "The events are spacelike separated: light could not cover 300 m in zero time, so changing their order cannot reverse a causal chain."
    },
    "pitfall": "Time dilation is not merely a delay in light reaching an observer. After signal-travel time is accounted for, properly synchronized clocks still display the relativistic effect.",
    "practice": [
      {
        "question": "Why may observers disagree about the order of spacelike events but not about the order of a cause and its effect?",
        "hint": "Compare spacelike and timelike intervals with the maximum signal speed.",
        "answer": "A cause and effect must have a timelike or lightlike separation, whose order is preserved by Lorentz transformations. No signal at or below c can connect a spacelike pair."
      },
      {
        "question": "A clock moves uniformly at 0.80c and records 3.0 μs between encounters with two laboratory markers. How much laboratory time passes between the encounters?",
        "hint": "At 0.80c, γ = 1/√(1 - 0.80²).",
        "answer": "γ = 5/3, so Δt = γΔτ = 5.0 μs."
      }
    ]
  },
  "12.3": {
    "topicId": "12.3",
    "question": "Why can the length of a moving rod not be obtained by transforming the coordinates of its ends at arbitrary times?",
    "overview": [
      "Length is the distance between endpoint positions measured simultaneously in the frame where the answer is required. Because simultaneity depends on the frame, the two laboratory endpoint events are not a simultaneous pair in the rod's rest frame.",
      "Lorentz transformations change x and t consistently while preserving the spacetime interval. A rod of proper length L₀ moving parallel to itself has laboratory length L = L₀/γ. The same transformation structure gives the relativistic velocity-addition law that preserves the limiting speed c."
    ],
    "conceptExplanations": [
      "The front and rear positions must be recorded at one laboratory time. An uncorrected photograph is not this direct measurement because light from different points reaches the camera at different times.",
      "Only the component parallel to relative motion contracts; transverse dimensions do not acquire a factor 1/γ. L₀ is measured in the object's rest frame and is therefore called proper length.",
      "The factor γ = 1/√(1 - v²/c²) is at least one, grows rapidly as v approaches c, and differs from one only by about v²/(2c²) at low speed.",
      "For S' moving at +v along x relative to S, a clear sign convention is x' = γ(x - vt), t' = γ(t - vx/c²). Reversing v reverses the corresponding signs.",
      "If an object has speed u in S, then S' measures u' = (u - v)/(1 - uv/c²). The denominator comes from transforming time and prevents subluminal velocities from combining into a superluminal one."
    ],
    "boundary": "The equation L = L₀/γ concerns endpoint separation in an inertial frame and assumes a rod at rest as a whole in another inertial frame. An extended accelerating body requires a separate treatment of rigidity, and its visual appearance is also altered by light-travel time.",
    "example": {
      "title": "Length of a Passing Rod",
      "problem": "A rod's proper length is 100 m. It moves along its axis at 0.80c relative to a laboratory. What length do laboratory sensors triggered simultaneously obtain?",
      "steps": [
        "Calculate γ = 1/√(1 - 0.80²) = 1/0.60 = 5/3.",
        "Both endpoint coordinates must refer to the same laboratory time.",
        "Apply L = L₀/γ = 100 m·3/5 = 60 m."
      ],
      "answer": "The longitudinal laboratory length is 60 m; in the rod frame its length remains 100 m.",
      "check": "The result is below the proper length and would approach 100 m as the speed approaches zero."
    },
    "pitfall": "Length contraction is not mechanical compression in the object's own frame. It is the difference between spatial slices through the same extended world tube made by different observers.",
    "practice": [
      {
        "question": "Why can one not measure a moving train's laboratory length by marking the locomotive position and then, one second later, the last carriage position?",
        "hint": "Recall the operational definition of length in a chosen frame.",
        "answer": "That coordinate difference mixes the train's displacement with its size. Both endpoint positions must be recorded at the same laboratory time."
      },
      {
        "question": "A particle moves at 0.90c in a laboratory, while an observer follows it at 0.50c. What particle speed does the observer measure?",
        "hint": "Use u' = (u - v)/(1 - uv/c²).",
        "answer": "u' = (0.90 - 0.50)c/(1 - 0.90·0.50) = 0.40c/0.55 ≈ 0.727c."
      }
    ]
  },
  "12.4": {
    "topicId": "12.4",
    "question": "How does the geometry of a spacetime diagram show whether one event can physically influence another?",
    "overview": [
      "A Minkowski diagram represents an event by coordinates x and ct and an object's history by a worldline. With equal axis scales, light travels at 45 degrees and forms the light-cone boundary; a massive object's worldline must remain inside that cone.",
      "The interval s² = c²Δt² - Δx² is the same in every inertial frame for the chosen sign convention. A positive interval permits causal influence and a frame where both events occur at one place; zero describes light; a negative interval means no subluminal signal can connect the events."
    ],
    "conceptExplanations": [
      "A worldline's slope encodes speed: with ct vertical, |dx/d(ct)| equals |v|/c. A vertical line is rest in that frame, while a bend indicates changing velocity.",
      "Future and past light cones contain events respectively reachable from an event or able to influence it. Their boundaries are the rays x = ±ct.",
      "Interval invariance unifies time dilation, length contraction, and causality. For a timelike pair, proper time is Δτ = √(Δt² - Δx²/c²).",
      "The order of timelike and lightlike events is preserved for all inertial observers. A spacelike pair may reverse order precisely because neither event can cause the other.",
      "The twins compare proper times along different worldlines between common meetings. The traveler changes inertial segments at turnaround, so the situations are not symmetric; the age difference is determined by the complete paths, not by a momentary 'feeling' of speed."
    ],
    "boundary": "A flat x-ct diagram suppresses two spatial coordinates and represents special relativity. In curved spacetime light cones are defined locally and intervals come from the metric; long lines on the simple plot cannot be interpreted as globally Euclidean.",
    "example": {
      "title": "Testing the Causal Relation Between Events",
      "problem": "Two events are 5.0 μs apart in laboratory time and 1.20 km apart in position. Determine the interval type and the proper time between them.",
      "steps": [
        "In 5.0 μs light travels cΔt ≈ 1.50 km, greater than 1.20 km.",
        "Compute Δx/c ≈ 4.00 μs and Δτ = √[(5.0 μs)² - (4.00 μs)²].",
        "This gives Δτ ≈ √(25.0 - 16.0) μs ≈ 3.0 μs, so s² is positive."
      ],
      "answer": "The interval is timelike, causal influence is possible, and a clock moving uniformly from the first event to the second records about 3.0 μs.",
      "check": "The required average speed is 1.20 km/5.0 μs = 0.80c, below c and consistent with a timelike interval."
    },
    "pitfall": "A line's visual angle has physical meaning only when x and ct use equal scales. Stretching an axis can make a subluminal worldline look 'faster than light' even though its coordinates are valid.",
    "practice": [
      {
        "question": "What does negative s² mean when s² = c²Δt² - Δx²?",
        "hint": "Compare Δx with the maximum light-travel distance c|Δt|.",
        "answer": "The separation is spacelike: |Δx| > c|Δt|, no causal signal can connect the events, and inertial frames may disagree about their time order."
      },
      {
        "question": "Events are separated by 600 m and 1.0 μs. Can the first cause the second?",
        "hint": "Find Δx/Δt or the distance light covers in that time.",
        "answer": "No. The required speed is 6.0·10⁸ m/s ≈ 2c, so the separation is spacelike."
      }
    ]
  },
  "12.5": {
    "topicId": "12.5",
    "question": "Which definitions of momentum and energy preserve conservation laws and Lorentz symmetry at speeds comparable with c?",
    "overview": [
      "For a particle of invariant mass m, relativistic momentum is p = γmv and total energy is E = γmc². At low speed, expansion gives E ≈ mc² + mv²/2: Newtonian kinetic energy appears as the addition to a much larger rest energy.",
      "Energy and momentum obey the invariant E² - p²c² = m²c⁴. Collisions and decays therefore conserve total E and vector p, not a separate sum of rest masses. The invariant mass of an interacting multiparticle system can include internal and kinetic energy of its constituents."
    ],
    "conceptExplanations": [
      "The factor γ makes momentum nonlinear in speed and prevents any finite force from accelerating a massive particle to c: the required momentum and energy diverge as v approaches c.",
      "E₀ = mc² refers to a particle or system in its center-of-momentum frame. It does not say that the total energy of a moving particle is always only mc².",
      "The relation E² = p²c² + m²c⁴ also works for m = 0, giving E = pc for a photon in vacuum.",
      "In a reaction, rest energy of the initial system may become product kinetic energy, or supplied energy may increase a composite system's invariant mass. The total four-dimensional quantity remains conserved.",
      "Four-momentum P = (E/c, p) transforms as one geometric object. Its square P² = m²c² is invariant and is especially useful for thresholds and decays."
    ],
    "boundary": "The formulas E = γmc² and p = γmv describe a free point particle with constant invariant mass. A bound system requires all internal energy and its total four-momentum; in curved spacetime, global energy conservation requires an appropriate symmetry of the geometry.",
    "example": {
      "title": "A Proton's Energy from Its Momentum",
      "problem": "A proton has rest energy 938 MeV and momentum 750 MeV/c. Find its total and kinetic energies.",
      "steps": [
        "Write E = √[(pc)² + (mc²)²].",
        "Insert pc = 750 MeV and mc² = 938 MeV.",
        "E = √(750² + 938²) MeV ≈ 1201 MeV.",
        "The kinetic energy is K = E - mc² ≈ 1201 - 938 = 263 MeV."
      ],
      "answer": "The total energy is about 1.20 GeV and the kinetic energy is 263 MeV.",
      "check": "Total energy exceeds both pc and rest energy; substitution back gives E² - p²c² ≈ (938 MeV)²."
    },
    "pitfall": "Avoid 'relativistic mass' unless a context specifically defines it. It is clearer to keep one invariant mass m and separately state the frame-dependent energy E and momentum p.",
    "practice": [
      {
        "question": "Can one free electron completely absorb one photon in empty space?",
        "hint": "Try to conserve energy and momentum together and compare the invariant masses of the initial and final states.",
        "answer": "No. The electron-plus-photon system has invariant mass greater than the electron mass, whereas a lone final electron must retain its mass. Another object is needed to take recoil."
      },
      {
        "question": "A particle moves at 0.80c. What fraction of its rest energy is its kinetic energy?",
        "hint": "K/E₀ = γ - 1.",
        "answer": "γ = 5/3, so K/E₀ = 2/3 ≈ 0.667."
      }
    ]
  },
  "12.6": {
    "topicId": "12.6",
    "question": "How does the local indistinguishability of free fall and inertial motion lead to a geometric description of gravity?",
    "overview": [
      "In a sufficiently small freely falling laboratory, the uniform part of a gravitational field can be removed by choosing the frame: unsupported bodies move inertially there. An observer standing on the ground instead experiences the support's proper acceleration, which an accelerometer detects.",
      "Tidal differences in acceleration cannot be removed throughout an extended region. General relativity describes them through spacetime curvature: free bodies follow timelike geodesics, light follows null geodesics, and clocks on different paths accumulate different proper times."
    ],
    "conceptExplanations": [
      "Equivalence is local: inside a small cabin, nearly uniform gravity has the same effect as cabin acceleration. Field gradients and tidal forces distinguish genuine curvature across a finite region.",
      "A freely falling accelerometer reads zero even while its coordinate speed relative to Earth changes. That is local inertial motion; weight on a scale is produced by the support force, not by gravity alone.",
      "In a weak stationary field, the fractional clock-rate difference is approximately Δf/f ≈ ΔΦ/c². A clock at higher gravitational potential runs faster relative to one at lower potential.",
      "A geodesic locally extremizes proper time, while curvature appears as relative acceleration of neighboring geodesics. A 'force pulling on a curved surface' is only an analogy, not the definition.",
      "Special relativity remains the local tangent theory: in a sufficiently small freely falling region, the metric is close to the Minkowski metric. General relativity specifies how those local regions fit together in the presence of energy and momentum."
    ],
    "boundary": "The approximation Δf/f ≈ ΔΦ/c² requires a weak stationary field and |ΔΦ| much smaller than c²; replacing ΔΦ by gh also assumes nearly constant g and modest height. Equivalence to uniform acceleration cannot remove tidal effects over an extended region.",
    "example": {
      "title": "Clock-Rate Difference with Height",
      "problem": "Estimate how much more time a clock 100 m above another near Earth's surface accumulates in one day. Use g = 9.81 m/s² and c = 3.00·10⁸ m/s.",
      "steps": [
        "For a small height, ΔΦ ≈ gh = 9.81·100 = 981 m²/s².",
        "The fractional rate difference is Δf/f ≈ gh/c² ≈ 981/(9.00·10¹⁶) = 1.09·10⁻¹⁴.",
        "Over 86400 s, the difference is 86400·1.09·10⁻¹⁴ s ≈ 9.4·10⁻¹⁰ s."
      ],
      "answer": "The upper clock accumulates about 0.94 ns more per day.",
      "check": "The sign is correct: higher potential means a faster clock, and the dimensionless ratio gh/c² is very small."
    },
    "pitfall": "The equivalence principle does not claim that every gravitational field is globally identical to an accelerated frame. Curvature and tidal forces cannot be removed by one coordinate choice across an entire region.",
    "practice": [
      {
        "question": "What does an ideal accelerometer read in a falling elevator and in an elevator resting on Earth's surface?",
        "hint": "An accelerometer measures proper acceleration produced by nongravitational forces.",
        "answer": "It reads approximately zero in free fall and about g upward in the resting elevator because of the support force."
      },
      {
        "question": "Estimate the daily clock difference for two clocks separated vertically by 10 m near Earth's surface.",
        "hint": "Within the gh/c² approximation, the result scales linearly with h.",
        "answer": "About 0.094 ns per day, one tenth of the result for 100 m."
      }
    ]
  },
  "13.1": {
    "topicId": "13.1",
    "question": "Which observations forced physics to abandon a purely classical picture of continuous energy exchange between light and matter?",
    "overview": [
      "Classical electrodynamics correctly describes light propagation, but combined with classical statistics it gives the wrong high-frequency thermal spectrum. Planck matched the observed spectrum by allowing material oscillators to exchange energy in amounts hf; Einstein then applied the energy quantum to light itself to explain the photoelectric effect.",
      "A photon has energy E = hf and, in vacuum, momentum p = E/c = h/λ. These relations account for the photoelectric threshold, momentum transfer in Compton scattering, and discrete detection events without abolishing wave interference of the electromagnetic field."
    ],
    "conceptExplanations": [
      "Classical equipartition among modes predicts an unbounded rise of radiated energy at short wavelengths. Planck's law suppresses high-frequency modes and agrees with the measured blackbody spectrum.",
      "In Planck's original hypothesis, a material oscillator changed energy in amounts nhf. Discreteness does not mean that only discrete frequencies exist; the size of a quantum is proportional to the chosen frequency.",
      "In the photoelectric effect, the maximum electron kinetic energy Kmax = hf - φ is set by frequency and work function φ. At fixed frequency, intensity primarily changes the number of emitted electrons, while a single photon below threshold lacks enough energy.",
      "A photon has no rest mass but carries energy and momentum. The relations E = hf and p = h/λ refer to propagation in vacuum; momentum of light in matter requires an explicit definition and system boundary.",
      "For a photon scattered by an almost free electron initially at rest, four-momentum conservation gives Δλ = h(1 - cos θ)/(mₑc). Its angular dependence quantitatively tests particle-like energy and momentum transfer."
    ],
    "boundary": "Einstein's one-photon equation assumes independent absorption of one photon by an electron and a well-defined surface work function. Intense fields permit multiphoton processes, while the simple Compton formula assumes a nearly free electron initially at rest.",
    "example": {
      "title": "Stopping Potential in the Photoelectric Effect",
      "problem": "Light of wavelength 400 nm strikes a metal with work function 2.20 eV. Find the maximum photoelectron kinetic energy and stopping potential.",
      "steps": [
        "Photon energy is E = hc/λ; use hc ≈ 1240 eV·nm.",
        "E = 1240/400 eV = 3.10 eV.",
        "Kmax = E - φ = 3.10 - 2.20 = 0.90 eV.",
        "From eVs = Kmax, the stopping potential is Vs = 0.90 V."
      ],
      "answer": "The maximum kinetic energy is 0.90 eV and the stopping potential is 0.90 V.",
      "check": "Photon energy exceeds the work function, and for charge e the numerical value in electron-volts matches the potential in volts."
    },
    "pitfall": "Increasing the intensity of weak monochromatic light above threshold need not increase Kmax; it increases photon flux. Each photon's energy is fixed by frequency.",
    "practice": [
      {
        "question": "In an ideal one-photon experiment, what happens if the intensity of light below threshold frequency is increased?",
        "hint": "Compare one photon's energy hf with the work function.",
        "answer": "No photoelectrons appear, however many individually insufficient photons arrive per unit time; this statement does not cover multiphoton absorption in a strong field."
      },
      {
        "question": "What is the Compton wavelength shift for a photon scattered through 90 degrees by an electron initially at rest? Use h/(mₑc) = 2.43 pm.",
        "hint": "At 90 degrees, cos θ is zero.",
        "answer": "Δλ = 2.43 pm·(1 - 0) = 2.43 pm."
      }
    ]
  },
  "13.2": {
    "topicId": "13.2",
    "question": "How can one particle source produce localized detection dots while many events form an interference distribution?",
    "overview": [
      "The de Broglie hypothesis assigns a free particle wavelength λ = h/p. Electron diffraction from crystals and fabricated slits shows that the hit distribution depends on this wavelength, although every electron is recorded as one localized event.",
      "Quantum theory adds complex amplitudes for indistinguishable alternatives and obtains probability from the squared magnitude of their sum. A weak beam therefore builds an interference pattern event by event; if the apparatus retains reliable path information, the interference term disappears."
    ],
    "conceptExplanations": [
      "The relation λ = h/p uses momentum, not simply speed. For a nonrelativistic particle p = mv; at high energy relativistic momentum must be used.",
      "A periodic crystal lattice acts as a diffraction structure with atomic spacing. The measured electron-scattering maxima agree with the de Broglie wavelength.",
      "One screen dot is not a fragment of smeared electric charge. Only statistics from many identically prepared trials approach the probability distribution with maxima and minima.",
      "Duality does not require a particle to be a classical ball at one moment and a classical wave at another. A quantum state supplies amplitudes, while the measurement arrangement defines the possible observed outcomes."
    ],
    "boundary": "The fringe-spacing equation Δy ≈ Lλ/d assumes coherent indistinguishable paths, small angles, a far field with L much greater than d, and narrow slits. Finite slit width adds a diffraction envelope, and interaction with a path detector reduces visibility.",
    "example": {
      "title": "Electron Fringes in the Far Field",
      "problem": "Electrons accelerated through 150 V pass through slits separated by d = 100 nm and reach a screen L = 1.0 m away. Estimate their wavelength and fringe spacing in the nonrelativistic approximation.",
      "steps": [
        "For an electron accelerated through U, use λ = h/√(2mₑeU), or λ ≈ 1.227 nm/√U with U in volts.",
        "At U = 150 V, λ ≈ 1.227/√150 nm ≈ 0.100 nm.",
        "At small angle, neighboring maxima are separated by Δy ≈ Lλ/d.",
        "Δy ≈ 1.0·0.100·10⁻⁹/(100·10⁻⁹) m = 1.0·10⁻³ m."
      ],
      "answer": "The wavelength is about 0.100 nm and the fringe spacing is about 1.0 mm.",
      "check": "The ratio λ/d = 10⁻³ is small, so the first fringe angle is small and the approximation is consistent."
    },
    "pitfall": "A single hit does not reveal which slit the electron 'really' crossed when the experiment did not measure a path. Adding such a detector changes the physical arrangement rather than merely reading a prewritten route.",
    "practice": [
      {
        "question": "Why does available path information reduce interference even if no person reads the stored record?",
        "hint": "The key condition is distinguishability of apparatus states, not human awareness.",
        "answer": "The path becomes entangled with distinguishable detector or environmental states, so the alternative amplitudes can no longer be coherently added for one identical final state."
      },
      {
        "question": "Electrons are accelerated through 600 V, with d = 50 nm and L = 2.0 m. Estimate the fringe spacing.",
        "hint": "First find λ ≈ 1.227 nm/√600, then use Δy ≈ Lλ/d.",
        "answer": "λ ≈ 0.0501 nm, hence Δy ≈ 2.0·0.0501/50 m·10⁻⁹/10⁻⁹ ≈ 2.00·10⁻³ m, or 2.0 mm."
      }
    ]
  },
  "13.3": {
    "topicId": "13.3",
    "question": "What does a quantum state specify, and how does it yield probabilities for a particular measurement?",
    "overview": [
      "A quantum state encodes the most complete predictions available within the theory for a specified preparation. In the position representation, a pure state is described by a complex wavefunction ψ(x); after normalization, the position probability density is |ψ(x)|².",
      "Amplitudes depend on the selected measurement and add with phases, so a superposition can interfere. A measurement procedure associates the state with possible outcomes and Born-rule probabilities; physical interaction with an apparatus and environment is sufficient, and conscious awareness appears in no equation."
    ],
    "conceptExplanations": [
      "The wavefunction itself is not a directly measured density of material. Its magnitude and relative phases determine repeated-measurement statistics; an overall phase factor changes no prediction.",
      "A complex amplitude can reinforce or cancel another amplitude before the magnitude is squared. Classical addition of probabilities is therefore valid only for incoherent or distinguishable alternatives.",
      "If |a⟩ and |b⟩ are allowed states, a normalized linear combination α|a⟩ + β|b⟩ is also allowed. Superposition is always relative to a basis: the same state can be an eigenstate in another basis.",
      "An observable corresponds to an operator whose eigenvalues give idealized outcomes. The Born rule supplies their probabilities; the post-record state description depends on the adopted measurement model.",
      "A detector leaves a stable physical record through amplification and environmental interaction. Neither statistical predictions nor automated experiments require human perception of an event."
    ],
    "boundary": "One wavefunction describes a pure state; a statistical mixture or a subsystem of an entangled state requires a density operator. The post-measurement update rule is part of an operational model and does not by itself choose a philosophical interpretation of quantum mechanics.",
    "example": {
      "title": "Measurement Probabilities for a Qubit",
      "problem": "A qubit is prepared in |ψ⟩ = (√3/2)|0⟩ + (e^{iφ}/2)|1⟩. Find the probabilities of outcomes 0 and 1 in this basis.",
      "steps": [
        "The amplitude for 0 is √3/2, so P(0) = |√3/2|² = 3/4.",
        "The amplitude for 1 is e^{iφ}/2, so P(1) = |e^{iφ}/2|² = 1/4.",
        "The relative phase φ is invisible in this particular distribution but affects measurements in another basis.",
        "Check normalization: 3/4 + 1/4 = 1."
      ],
      "answer": "P(0) = 0.75 and P(1) = 0.25, independent of φ for measurement in the |0⟩, |1⟩ basis.",
      "check": "The probabilities are nonnegative and sum to one; the absence of φ here does not make relative phase generally unobservable."
    },
    "pitfall": "A superposition is not classical ignorance about a result already selected. A 50/50 mixture and a coherent superposition may match in one basis but give different interference results in another.",
    "practice": [
      {
        "question": "How does an overall factor e^{iχ}|ψ⟩ differ from a relative phase between two components?",
        "hint": "Track all probabilities and the cross terms responsible for interference.",
        "answer": "The global phase cancels from every probability and is unobservable, whereas a relative phase changes interference between components."
      },
      {
        "question": "A state has P(1) = 0.16. About how many ones are expected in 2500 independent identical measurements?",
        "hint": "The expected count is NP, although one finite run fluctuates.",
        "answer": "The expected count is 2500·0.16 = 400; the actual count will normally differ slightly because of statistical variation."
      }
    ]
  },
  "13.4": {
    "topicId": "13.4",
    "question": "How is quantum localization connected to momentum spread, and why do bound systems have discrete energies?",
    "overview": [
      "A localized state is a wave packet built from components with different wave numbers, so compressing the packet requires a broader momentum range. Position and momentum standard deviations obey ΔxΔp ≥ ħ/2; this is a property of the prepared state, not merely instrument imperfection.",
      "The Schrödinger equation iħ∂ψ/∂t = Ĥψ gives unitary evolution for an isolated nonrelativistic system. Boundary conditions in a binding potential admit only certain stationary solutions and energies, while a finite barrier leaves a nonzero tunneling amplitude."
    ],
    "conceptExplanations": [
      "A packet is a superposition of plane waves. Its group velocity describes envelope motion, while spreading arises from group-velocity dispersion: spectral components have different dω/dk, meaning d²ω/dk² ≠ 0.",
      "Uncertainties are standard deviations of outcome distributions over identically prepared systems. The relation does not say that a particle secretly has exact x and p that an imperfect instrument reads poorly.",
      "The Hamiltonian Ĥ contains kinetic energy and the potential model. If it has no explicit time dependence, mean energy is conserved even when the state is a superposition of energy eigenstates.",
      "In a one-dimensional infinite well, the wavefunction vanishes at both walls. Standing waves fit an integer number of half wavelengths across the well, giving Eₙ = n²π²ħ²/(2mL²).",
      "Discreteness belongs to the spectrum of a particular bound problem, not to every energy in nature. A free particle, for example, has a continuous energy range.",
      "Where E < V, the wavefunction decays exponentially but can cross a finite barrier. The classical limit arises for large characteristic actions, coarse resolution, and often decoherence, not by literally changing ħ."
    ],
    "boundary": "The ordinary Schrödinger equation applies to nonrelativistic degrees of freedom in a specified potential. Infinite wells and rectangular barriers are idealizations; spin, particle creation, strong relativistic effects, and interaction with a quantized field require broader models.",
    "example": {
      "title": "An Electron in a Nanometer Well",
      "problem": "An electron is in a one-dimensional infinite well of width L = 1.00 nm. Estimate E₁, E₂, and the energy of the 2-to-1 transition.",
      "steps": [
        "Use Eₙ = n²h²/(8mₑL²).",
        "For L = 1.00 nm, the ground energy is E₁ ≈ 0.376 eV.",
        "E₂ = 4E₁ ≈ 1.504 eV.",
        "The emitted photon energy is ΔE = E₂ - E₁ ≈ 1.128 eV."
      ],
      "answer": "E₁ ≈ 0.376 eV, E₂ ≈ 1.50 eV, and the transition releases about 1.13 eV.",
      "check": "Energies scale as n² and as 1/L²; widening the well would reduce all levels and their separations."
    },
    "pitfall": "The uncertainty relation cannot be read as permission to set Δx = 0 and then simply assign an infinite momentum. An exact position state is non-normalizable in the ideal limit and has an unbounded momentum spectrum.",
    "practice": [
      {
        "question": "Why can a particle with E below V₀ cross a finite barrier but not an infinitely wide one?",
        "hint": "Follow the exponentially decaying amplitude through the classically forbidden region.",
        "answer": "For a finite barrier, the decaying wavefunction reaches the second boundary and connects to a transmitted solution. As width becomes unbounded, the amplitude tends to zero before an exit."
      },
      {
        "question": "A particle is localized to Δx = 0.10 nm. What is the minimum Δp allowed by the uncertainty relation?",
        "hint": "Use Δp ≥ ħ/(2Δx), with ħ = 1.055·10⁻³⁴ J·s.",
        "answer": "Δp ≥ 1.055·10⁻³⁴/(2·1.0·10⁻¹⁰) ≈ 5.28·10⁻²⁵ kg·m/s."
      }
    ]
  },
  "13.5": {
    "topicId": "13.5",
    "question": "What correlations does quantum entanglement permit beyond the bounds of local hidden-variable models, and why do they not enable faster-than-light communication?",
    "overview": [
      "Spin is an intrinsic quantum degree of freedom with discrete projection results; it cannot literally be modeled as a rotating charged ball. A composite system may occupy an entangled state that cannot be factored into independent states of its parts.",
      "Bell inequalities bound correlations for a broad class of local hidden-variable theories, and experiments violate those bounds as quantum mechanics predicts. Yet each side's local probabilities are independent of the distant measurement choice, so a controllable signal appears only after ordinary comparison of records."
    ],
    "conceptExplanations": [
      "For a spin-one-half particle, measuring a component along a selected axis gives ±ħ/2. Different components are incompatible: a definite spin-z state has no definite spin-x value.",
      "In an entangled state the whole has a known description while an individual subsystem has a mixed state. The correlations appear only in joint outcome statistics.",
      "A Bell test compares correlations across several analyzer settings. A violation rules out the joint assumptions of locality and predetermined outcomes for the tested model class; it does not prove one unique interpretation of quantum theory.",
      "Every local outcome remains random, and a remote basis choice does not change its marginal distribution. Observers need a light-speed-limited classical channel to reveal the correlation.",
      "Decoherence occurs when system phases spread into correlations with the environment, making local interference practically inaccessible. It explains robust quasiclassical records but does not alone settle every interpretive question about a single outcome."
    ],
    "boundary": "Ideal Bell pairs and projective measurements are models; real tests must control losses, random setting choices, and causal separation. Conclusions depend on stated assumptions, while no-signaling is a claim about observable statistics rather than a preferred interpretive vocabulary.",
    "example": {
      "title": "Correlations in a Bell Pair",
      "problem": "Two qubits are prepared in |Φ+⟩ = (|00⟩ + |11⟩)/√2. Which outcomes can occur when both are measured in the 0/1 basis, and what does one side alone observe?",
      "steps": [
        "Only joint states |00⟩ and |11⟩ have nonzero amplitudes.",
        "Each squared amplitude is 1/2, so pairs 00 and 11 each occur with probability 1/2.",
        "Pairs 01 and 10 have zero probability in the ideal model.",
        "Ignoring the second qubit, the first gives 0 and 1 with probability 1/2 each; its local sequence is random."
      ],
      "answer": "The joint outcomes match perfectly, while either side alone sees random zeros and ones with equal probability.",
      "check": "Joint probabilities sum to one, and the local distribution contains no message from the other side."
    },
    "pitfall": "Violating a Bell inequality does not transmit energy or a chosen bit instantaneously. It excludes a specified class of local explanations for the joint statistics.",
    "practice": [
      {
        "question": "Can Alice encode a bit in her analyzer choice so Bob reads it from his local sequence alone?",
        "hint": "Distinguish conditional joint correlations from Bob's marginal distribution.",
        "answer": "No. Bob's distribution is independent of Alice's choice; her setting becomes visible only after classical comparison of their results."
      },
      {
        "question": "For ideal |Φ+⟩, 1000 pairs are measured in the 0/1 basis. What mean counts of 00, 11, 01, and 10 are expected?",
        "hint": "Multiply the trial count by each probability.",
        "answer": "About 500 pairs each of 00 and 11, and zero of 01 and 10; the first two finite counts fluctuate around 500."
      }
    ]
  },
  "13.6": {
    "topicId": "13.6",
    "question": "How do quantized electron states connect atomic structure with spectral lines, periodicity, and chemical bonding?",
    "overview": [
      "Rutherford scattering showed that positive charge and nearly all atomic mass occupy a tiny nucleus. Bohr's model introduced discrete orbits and reproduced the main hydrogen levels, but modern quantum mechanics replaces electron trajectories with orbitals: states carrying probability distributions.",
      "Quantum numbers and the Pauli principle organize electron-state filling and underlie periodic chemical behavior. In a molecule, electron states belong to the entire nuclear arrangement; transitions absorb or emit photons with hf = |ΔE|, and stimulated emission permits optical amplification."
    ],
    "conceptExplanations": [
      "Large-angle alpha-particle scattering is rare but requires a compact massive center. Bohr orbits remain historically useful and give the hydrogen-like spectrum, yet they do not describe general many-electron atoms.",
      "An orbital is labeled by spatial quantum numbers n, l, and m and is not a path around the nucleus. Its shape represents a state amplitude, while spin projection supplies another quantum number.",
      "No two electrons in an atom may have the same complete quantum-number set. Together with orbital energies and electron interactions, this produces shells and recurring valence configurations across the periodic table.",
      "A covalent bond can be understood through occupation of bonding molecular states that lower total energy. Real bonding includes kinetic energy and attraction and repulsion among all charges; it is not merely a static shared-pair picture.",
      "A spectral frequency comes from a level difference, while intensity depends on populations and selection rules. A laser needs a gain medium, a population inversion or equivalent pumping scheme, stimulated emission, and resonator feedback."
    ],
    "boundary": "Eₙ = -13.6 eV/n² applies to an isolated nonrelativistic hydrogen-like ion with an infinitely heavy point nucleus. Precision spectroscopy needs reduced mass, fine and hyperfine structure, and radiative corrections; many-electron atoms require electron-interaction methods.",
    "example": {
      "title": "The Red Hydrogen H-alpha Line",
      "problem": "Find the photon energy and wavelength for a hydrogen transition from n = 3 to n = 2, using Eₙ = -13.6 eV/n².",
      "steps": [
        "Photon energy is 13.6 eV·(1/2² - 1/3²).",
        "The fraction is 1/4 - 1/9 = 5/36, so ΔE ≈ 1.89 eV.",
        "Use λ = hc/ΔE with hc ≈ 1240 eV·nm.",
        "λ ≈ 1240/1.89 nm ≈ 656 nm."
      ],
      "answer": "The photon energy is about 1.89 eV and its wavelength about 656 nm.",
      "check": "The transition ends at n = 2 and belongs to the visible Balmer series; 656 nm is red light."
    },
    "pitfall": "An orbital is not a blurred classical orbit of one electron. It is a state amplitude; one position measurement gives one point, while a distribution emerges from repeated preparations.",
    "practice": [
      {
        "question": "How many electrons may occupy one spatial orbital, and how must their states differ?",
        "hint": "Apply the Pauli principle to spin projection.",
        "answer": "At most two; their spin projections must be opposite so their complete quantum-number sets differ."
      },
      {
        "question": "Find the photon wavelength for the hydrogen transition n = 2 to n = 1.",
        "hint": "Use ΔE = 13.6 eV·(1 - 1/4), then λ = 1240 eV·nm/ΔE.",
        "answer": "ΔE = 10.2 eV and λ ≈ 121.6 nm, an ultraviolet Lyman-series line."
      }
    ]
  },
  "13.7": {
    "topicId": "13.7",
    "question": "How do collective electron states in a crystal become controllable conductivity in a semiconductor device?",
    "overview": [
      "The lattice's periodic potential and the Pauli principle turn discrete atomic levels from an enormous number of atoms into allowed energy bands. Band filling and band-gap size determine how readily an electric field can produce current, while transport also depends on temperature, scattering, and defects.",
      "Donor and acceptor dopants control electron and hole concentrations while preserving macroscopic charge neutrality. At a p-n junction, diffusion creates a depletion region and built-in field; applied bias changes the barrier, enabling diodes, transistors, light-emitting diodes, and solar cells."
    ],
    "conceptExplanations": [
      "Electrons in an ideal crystal occupy states extended across the lattice rather than being assigned to one atom. Lattice vibrations are quantized as phonons and participate in scattering and heat transport.",
      "A band is a range of allowed energies; a forbidden gap separates valence and conduction bands. The Fermi level helps determine the occupation of available states.",
      "A metal has a partly filled band or overlapping bands. An insulator has a large gap, while an intrinsic semiconductor has a gap small enough for temperature or light to create useful carrier densities; the boundary depends on material and conditions.",
      "A donor normally creates n-type material with electrons as majority carriers, while an acceptor creates p-type material with holes. Ionized dopants compensate carrier charge, so the bulk does not become a strongly charged object.",
      "Forward bias promotes carrier injection across a p-n junction; reverse bias normally suppresses current until breakdown. Recombination can emit light, separation of photocarriers can produce current, and a third terminal can control a channel for switching or gain."
    ],
    "boundary": "The simple band picture assumes a nearly periodic crystal and a quasiparticle description. A real device needs models of mobility, contacts, recombination, temperature, and geometry; gap values vary with temperature, and a transition also depends on momentum and selection rules.",
    "example": {
      "title": "Silicon's Spectral Threshold",
      "problem": "Estimate the longest photon wavelength whose energy equals silicon's 1.12 eV band gap near room temperature.",
      "steps": [
        "The energy threshold satisfies hc/λ = E_g.",
        "Use hc ≈ 1240 eV·nm.",
        "λ = 1240/1.12 nm ≈ 1107 nm = 1.11 μm."
      ],
      "answer": "The energetic threshold corresponds to about 1.11 μm; a longer-wavelength photon has less energy than the gap.",
      "check": "This is only an energy condition: silicon has an indirect gap, so absorption probability also depends on phonons and material thickness."
    },
    "pitfall": "p-type does not mean a positively charged chunk and n-type does not mean a negatively charged one. The labels identify majority mobile carriers in an almost neutral crystal.",
    "practice": [
      {
        "question": "Why does a completely filled valence band conduct poorly even though it contains many electrons?",
        "hint": "Consider whether nearby empty states are available for the field to shift electrons into.",
        "answer": "In a full band, symmetric current contributions cancel and no nearby empty states are available; conduction appears with holes or carriers in a partly filled band."
      },
      {
        "question": "Can an 850 nm photon cross silicon's 1.12 eV energy gap?",
        "hint": "Calculate E = 1240/λ(nm) eV.",
        "answer": "E ≈ 1240/850 = 1.46 eV, above 1.12 eV, so excitation is energetically possible although actual absorption depends on the transition structure."
      }
    ]
  },
  "13.8": {
    "topicId": "13.8",
    "question": "Which quantum effects actually perform work in modern devices, and which engineering limits separate a principle from a usable machine?",
    "overview": [
      "Quantum technology extends far beyond quantum computers. Stimulated emission produces coherent gain in a laser, tunneling current probes atomic surface structure, nuclear-spin resonance encodes MRI signals, and a collective electron state produces superconductivity.",
      "A qubit is a controlled two-level quantum system subjected to unitary operations and measurement. A useful algorithm must arrange amplitude interference so that a desired property is enhanced; decoherence, control errors, and limited readout prevent superposition from acting as a free exhaustive search."
    ],
    "conceptExplanations": [
      "Lasers and masers use stimulated emission, in which a new quantum is coherent with the driving field. Net gain needs pumping and a population distribution that lets amplification exceed resonator losses.",
      "A scanning tunneling microscope measures current exponentially sensitive to the gap between a conducting tip and surface. An electron microscope instead forms an electron beam with electromagnetic lenses and exploits its short wavelength; these are distinct instruments.",
      "MRI excites nuclear magnetic moments with radio-frequency fields in a strong static field and localizes signals with gradients. Its RF photons are nonionizing, although strong-field, projectile, and heating safety constraints remain essential.",
      "Below critical parameters, a superconductor has zero measurable DC resistance and expels magnetic field through the Meissner effect. Pairing theory explains conventional superconductors well, while the microscopic mechanism of many high-temperature materials remains active research.",
      "n qubits span 2ⁿ basis amplitudes, but measurement returns limited classical data. Advantage exists only for suitable algorithms and sufficiently low errors, often with substantial error-correction overhead."
    ],
    "boundary": "These examples describe physical principles, not a complete device specification or medical recommendation. Real lasers, MRI systems, microscopes, superconductors, and quantum processors require material, noise, calibration, critical-field, and safety analysis.",
    "example": {
      "title": "Proton Larmor Frequency in MRI",
      "problem": "For protons, γ/2π ≈ 42.58 MHz/T. Find the resonance frequency in a 3.00 T scanner.",
      "steps": [
        "Larmor frequency is proportional to field: f = (γ/2π)B.",
        "Substitute f = 42.58 MHz/T·3.00 T.",
        "This gives f ≈ 127.74 MHz."
      ],
      "answer": "The proton resonance frequency is approximately 128 MHz.",
      "check": "Tesla cancels, leaving frequency; this is radio frequency, not the energy of an ionizing X-ray photon."
    },
    "pitfall": "A quantum computer does not compute and reveal all 2ⁿ alternatives at once. An algorithm must transform phases and amplitudes so a small number of measurements exposes the required structure.",
    "practice": [
      {
        "question": "Why is superposition alone insufficient to speed up an arbitrary program?",
        "hint": "Account for how little classical information the final measurement returns.",
        "answer": "The exponentially many amplitudes cannot all be read directly. A task-specific interference algorithm, proven advantage, and error control are required."
      },
      {
        "question": "What is the photon energy of a red 633 nm He-Ne laser?",
        "hint": "Use E = 1240 eV·nm/λ.",
        "answer": "E ≈ 1240/633 eV ≈ 1.96 eV."
      }
    ]
  },
  "14.1": {
    "topicId": "14.1",
    "question": "Why is a bound nucleus lighter than its free nucleons, and what does that difference say about stability?",
    "overview": [
      "A nucleus contains Z protons and N neutrons. At nuclear distances the residual strong interaction binds nucleons, while Coulomb repulsion acts among all protons; the balance of these terms and quantum shell filling determine a nuclide's energy.",
      "Completely separating a nucleus into free nucleons requires binding energy B = Δmc². Here mass defect Δm is the positive difference between the sum of free-component masses and the bound-state mass. Binding energy per nucleon is useful for comparison but does not alone determine a decay rate or probability."
    ],
    "conceptExplanations": [
      "The proton number determines nuclear charge and chemical element, while A = Z + N is the mass number. Protons and neutrons are made of quarks, but often serve as effective particles in low-energy nuclear descriptions.",
      "The nuclear force among nucleons is a low-energy residual manifestation of the strong interaction. It is short-ranged and saturates, so a distant proton does not attract every nucleon as an electric charge interacts with every other charge.",
      "For nuclear masses, Δm = Zmₚ + Nmₙ - Mnucleus. With neutral-atom masses, one should consistently replace each proton by a hydrogen atom so electron masses cancel; mixing the two tables creates an error.",
      "Isotopes have the same Z and different N. Long-lived combinations form a valley of stability: heavy nuclei need a neutron excess, while nuclides away from the valley approach it through beta or alpha decay or fission when energetically allowed."
    ],
    "boundary": "A semi-empirical volume, surface, Coulomb, and asymmetry picture explains broad trends but not shell structure or precise measured masses. A mass-defect calculation must consistently use either atomic or nuclear masses and include electron binding at the required precision.",
    "example": {
      "title": "Binding Energy of Helium-4",
      "problem": "Using atomic masses m(¹H) = 1.007825 u, mₙ = 1.008665 u, and m(⁴He) = 4.002603 u, find total and per-nucleon binding energy. Use 1 u·c² = 931.5 MeV.",
      "steps": [
        "For atomic masses, Δm = 2m(¹H) + 2mₙ - m(⁴He).",
        "Δm = 2·1.007825 + 2·1.008665 - 4.002603 = 0.030377 u.",
        "B = 0.030377·931.5 MeV ≈ 28.3 MeV.",
        "For four nucleons, B/A ≈ 28.3/4 = 7.07 MeV."
      ],
      "answer": "The ⁴He binding energy is about 28.3 MeV, or 7.07 MeV per nucleon.",
      "check": "The defect is positive: the bound state is lighter than its free components by B/c². Electrons cancel consistently through the hydrogen and helium atomic masses."
    },
    "pitfall": "A larger total binding energy does not always mean greater binding per particle; total B also grows with particle count. Reaction energetics require comparing complete initial and final masses, not only one B/A value.",
    "practice": [
      {
        "question": "Why can both fusion of light nuclei and fission of very heavy nuclei release energy?",
        "hint": "Track products along the binding-energy-per-nucleon curve.",
        "answer": "In both cases products lie closer to the region of higher binding per nucleon, so their total mass is lower and the difference is released as energy."
      },
      {
        "question": "Estimate deuteron binding from m(¹H) = 1.007825 u, mₙ = 1.008665 u, and m(²H) = 2.014102 u.",
        "hint": "Find [m(¹H) + mₙ - m(²H)]·931.5 MeV.",
        "answer": "Δm = 0.002388 u, giving B ≈ 2.22 MeV."
      }
    ]
  },
  "14.2": {
    "topicId": "14.2",
    "question": "How does random decay of one nucleus produce a precise ensemble law, and how does that law connect to actual dose in matter?",
    "overview": [
      "Alpha, beta, and gamma processes change a nucleus in different ways while conserving energy, momentum, charge, and applicable quantum numbers. One unstable nucleus decays at a random time, but a constant probability per unit time gives N(t) = N₀e^(−λt) for a large identical population.",
      "Activity A = λN counts decays per second but is not biological harm. Absorbed dose measures energy per mass in grays, equivalent dose weights radiation type in sieverts, and actual risk further depends on tissue, distribution, dose rate, and exposure conditions."
    ],
    "conceptExplanations": [
      "Alpha decay emits a ⁴He nucleus and lowers A by 4 and Z by 2. In beta-minus decay a neutron becomes a proton with an electron and antineutrino; beta-plus decay or electron capture lowers Z. A gamma transition removes excitation without changing A or Z.",
      "Half-life T₁/₂ = ln 2/λ characterizes an ensemble. A nucleus does not 'age' toward decay: for an exponential law, the conditional chance of decay in the next interval does not depend on its previous lifetime.",
      "1 Bq is one decay per second; 1 Gy is 1 J/kg of absorbed energy. Equivalent dose H = ΣwᵣDᵣ uses radiation weighting factors and is measured in sieverts; these units are not interchangeable.",
      "Shielding depends on energy and radiation type: alpha particles have short range but are dangerous internally; beta radiation can create bremsstrahlung in high-Z shielding; gamma rays are attenuated gradually, and neutrons need suitable hydrogen-rich and absorbing materials."
    ],
    "boundary": "One exponential describes an isolated population in one state with constant λ. Daughter chains, activation, and a changing source need coupled equations. Source activity cannot be converted to dose without geometry, spectrum, time, absorption, and biokinetics.",
    "example": {
      "title": "Activity After Three Half-Lives",
      "problem": "An iodine-131 sample has half-life 8.0 days and initial activity 80 MBq. What is its activity after 24 days if no new nuclei enter?",
      "steps": [
        "The number of elapsed half-lives is n = 24/8.0 = 3.",
        "Activity has the same decay factor as N: A = A₀(1/2)ⁿ.",
        "A = 80 MBq·(1/2)³ = 80/8 MBq = 10 MBq."
      ],
      "answer": "After 24 days the activity is 10 MBq.",
      "check": "Every 8 days it halves: 80 to 40 to 20 to 10 MBq."
    },
    "pitfall": "Half-life does not mean every nucleus is gone after two periods. On average one quarter remains, and an exponential never reaches exactly zero at finite time.",
    "practice": [
      {
        "question": "Why does equal activity from two sources not guarantee equal equivalent dose to a person?",
        "hint": "List radiation type and energy, geometry, and route of intake.",
        "answer": "Each decay can deposit different energy with different biological effectiveness; distance, shielding, exposed tissue, and internal versus external location also matter."
      },
      {
        "question": "A sample has activity 200 Bq and half-life 6 h. What is its activity after 18 h?",
        "hint": "18 h is three half-lives.",
        "answer": "A = 200·(1/2)³ = 25 Bq."
      }
    ]
  },
  "14.3": {
    "topicId": "14.3",
    "question": "How can a useful self-sustaining chain reaction be maintained while heat removal and fission-product confinement remain assured?",
    "overview": [
      "In fission, a heavy nucleus becomes two principal fragments, neutrons, and radiation; reduced final mass releases energy of order hundreds of MeV per event. Some new neutrons induce later fissions, and the effective multiplication factor k_eff compares neutron production with absorption and leakage.",
      "A power reactor is held near k_eff = 1 by design, feedback, and controls while coolant transports heat to an energy-conversion cycle. Fission products continue producing decay heat after the chain reaction stops, so safety relies on cooling, physical barriers, and independent layers of protection."
    ],
    "conceptExplanations": [
      "Most fission energy begins as fragment kinetic energy and becomes fuel heat. Not every neutron capture causes fission, and the product spectrum is probabilistic.",
      "A chain is possible when enough next-generation neutrons remain in a suitable energy range. Geometry, composition, moderator, absorbers, and leakage determine the balance.",
      "A system is subcritical for k_eff below one, steady by generation at one, and growing above one. Controlled dynamics crucially uses the small delayed-neutron fraction, which provides time for regulation.",
      "Specific designs vary, but usually require fuel, reactivity control, coolant, a heat exchanger or direct boiling, a turbine-generator, and confinement barriers. Not every reactor uses ordinary water as moderator.",
      "Decay heat comes from radioactive products and actinides and does not stop with fission. Used fuel remains a heat and radiation source; its management includes cooling, shielding, storage, and long-term isolation."
    ],
    "boundary": "A one-k_eff generation model shows criticality but not real power versus time. Reactor kinetics needs delayed neutrons, temperature and void coefficients, spatial flux, and thermal hydraulics; safety cannot be inferred from one number without design scenarios.",
    "example": {
      "title": "Sensitivity of a Chain to k_eff",
      "problem": "A simplified generation model starts with 10⁶ neutrons. How many remain after 20 generations for k_eff = 0.98 and k_eff = 1.02?",
      "steps": [
        "The model uses Nₙ = N₀k_effⁿ; no physical generation time is specified.",
        "For 0.98, N₂₀ = 10⁶·0.98²⁰ ≈ 6.68·10⁵.",
        "For 1.02, N₂₀ = 10⁶·1.02²⁰ ≈ 1.49·10⁶.",
        "A small coefficient offset accumulates repeatedly across generations."
      ],
      "answer": "About 6.68·10⁵ neutrons in the subcritical case and 1.49·10⁶ in the supercritical case.",
      "check": "Below-one k_eff gives decay and above-one gives growth; this is not a calculation of seconds or thermal power."
    },
    "pitfall": "'Critical' does not mean accidental: k_eff = 1 is the normal state of a steady chain. Hazard depends on dynamics, reactivity margin, cooling, and barrier condition.",
    "practice": [
      {
        "question": "Why does an emergency shutdown of the chain reaction not remove the need to cool the core?",
        "hint": "Separate prompt fission power from decay of products already created.",
        "answer": "The controlled chain ends, but accumulated radioactive products keep decaying and generating heat that must be removed."
      },
      {
        "question": "A reactor had 500 MW of thermal power before shutdown. If the stated model assigns 6% residual power immediately afterward, how much heat must be removed?",
        "hint": "The percentage is a supplied assumption, not a universal constant.",
        "answer": "0.06·500 MW = 30 MW of thermal power."
      }
    ]
  },
  "14.4": {
    "topicId": "14.4",
    "question": "Which conditions let light nuclei penetrate electric repulsion often enough for fusion to deliver sustained energy gain?",
    "overview": [
      "Positively charged nuclei repel, while the strong interaction binds only at very short distance. High temperature increases fast collisions, and quantum tunneling gives a nonzero probability of crossing the Coulomb barrier even below its classical top.",
      "A useful reaction rate requires sufficient density, temperature, and confinement time while radiation and transport losses are controlled. Magnetic systems confine a dilute charged plasma with fields, whereas inertial systems rapidly compress a small target; in either case plasma gain is not the same as net electrical efficiency."
    ],
    "conceptExplanations": [
      "Barrier penetrability depends steeply on charge, energy, and reduced mass, so heating changes reaction rate much more than linearly. Tunneling does not let a nucleus borrow energy; total energy remains conserved.",
      "In a stellar core, gravity maintains pressure and temperature throughout an enormous volume for a very long time. The Sun primarily uses the proton-proton chain, not the laboratory-friendly deuterium-tritium reaction.",
      "A confinement criterion compares alpha heating with losses and is often expressed through the triple product nTτ_E. High temperature alone is insufficient if plasma loses energy too quickly.",
      "In tokamaks and stellarators, magnetic fields guide charged particles along helical paths, but turbulence and instabilities cause transport. Inertial confinement uses a laser pulse or another driver so fuel burns before disassembly.",
      "Plasma Q = P_fusion/P_heating compares fusion power with externally delivered plasma heating. A power plant must also convert neutron energy to electricity and operate magnets, cryogenics, drivers, and the fuel cycle."
    ],
    "boundary": "The 17.6 MeV total and 3.5/14.1 MeV product shares belong to D + T → ⁴He + n. Plasma Q, scientific breakeven, engineering gain, and net electric gain are different metrics; none should replace another without a system boundary and pulse duration.",
    "example": {
      "title": "Meaning of Plasma Gain Q = 10",
      "problem": "A plasma receives 50 MW of external heating and has stated plasma gain Q = 10. Find fusion power and decide whether net electric output follows.",
      "steps": [
        "By definition Q = P_fusion/P_heating.",
        "P_fusion = 10·50 MW = 500 MW.",
        "Subtracting 50 MW from 500 MW as a 'net plasma power' is invalid: P_fusion includes neutron and alpha-particle energy, while Q specifies only a ratio.",
        "Net electricity also needs thermal-cycle efficiency and every auxiliary-system load."
      ],
      "answer": "Fusion reactions produce 500 MW in the stated definition, but the data are insufficient for net electric power.",
      "check": "Power units agree, and the system boundary explicitly separates plasma heating from the complete facility."
    },
    "pitfall": "'More energy out than in' is meaningless without defining inputs, outputs, duration, and facility boundary. Target gain, plasma Q, and energy drawn from the grid are different quantities.",
    "practice": [
      {
        "question": "Why can the Sun sustain fusion at a lower temperature than a typical terrestrial D-T plasma even though the proton-proton reaction is slower?",
        "hint": "Compare volume, density, and gravitational confinement time.",
        "answer": "The Sun confines an enormous plasma mass for billions of years, so a tiny reaction probability can supply its power. A terrestrial device needs a much higher rate in a small volume and short time."
      },
      {
        "question": "A D-T plasma produces 100 MW of fusion power. Approximately how much is carried by alpha particles and neutrons if their energies are 3.5 and 14.1 MeV?",
        "hint": "Divide power in the ratio 3.5:14.1 with total energy 17.6 MeV.",
        "answer": "Alpha particles carry about 100·3.5/17.6 ≈ 20 MW and neutrons about 80 MW."
      }
    ]
  },
  "14.5": {
    "topicId": "14.5",
    "question": "How does the Standard Model organize elementary particles and interactions, and where does its explanatory scope end?",
    "overview": [
      "Matter fermions form three generations of quarks and leptons. Electromagnetic, weak, and strong interactions are mediated by gauge-field quanta: photons, W and Z bosons, and gluons; quarks are confined in hadrons while leptons do not undergo the strong interaction.",
      "Through electroweak symmetry breaking and particle couplings, the Higgs field sets W, Z, and fermion masses, but most proton mass comes from quark-gluon dynamics in QCD. The theory is extraordinarily accurate in scope, yet it omits quantum gravity and does not explain dark matter, dark energy, baryon asymmetry, or all neutrino parameters."
    ],
    "conceptExplanations": [
      "Six quark flavors carry fractional electric charge and color, while six leptons comprise three charged particles and three neutrinos. Photons mediate electromagnetism, gluons the strong force, and W± and Z bosons the weak force.",
      "Every particle has an antiparticle with the same mass and spin and opposite additive quantum numbers. Annihilation converts a pair into other allowed states while conserving total energy, momentum, and charge; matter does not vanish into nothing.",
      "Continuous symmetries connect to conservation laws, while gauge symmetry fixes interaction structure. A particular process requires checking electric charge, four-momentum, angular momentum, and applicable quantum numbers rather than one universal checklist.",
      "A nonzero Higgs-field value lets W and Z be massive while retaining electroweak consistency; fermion masses arise from their Yukawa couplings. The photon stays massless, and a composite nucleon's mass is not a simple sum of its valence-quark masses.",
      "The minimal Standard Model excludes gravity and must be extended for observed neutrino masses and mixing. The identity of dark matter and the reason matter dominates antimatter remain open experimental questions."
    ],
    "boundary": "The Standard Model is a quantum field theory of the three nongravitational interactions. Its elementary-particle chart is not by itself a model of nuclei or hadrons without nonperturbative QCD, and an observation beyond the minimal theory does not automatically identify the correct extension.",
    "example": {
      "title": "Conservation Laws in Neutron Beta Decay",
      "problem": "Check charge, baryon number, and electron-lepton number in n → p + e⁻ + electron antineutrino, then find available energy using mₙc² = 939.565 MeV, mₚc² = 938.272 MeV, and mₑc² = 0.511 MeV.",
      "steps": [
        "Charge: 0 = (+1) + (-1) + 0.",
        "Baryon number: 1 = 1 + 0 + 0; electron-lepton number: 0 = 0 + 1 - 1.",
        "Available kinetic energy is Q = 939.565 - 938.272 - 0.511 MeV.",
        "Q ≈ 0.782 MeV is shared by the electron, antineutrino, and proton recoil."
      ],
      "answer": "The listed quantum numbers are conserved and product kinetic energy totals about 0.782 MeV.",
      "check": "Without the antineutrino, lepton number and the observed continuous energy-momentum balance of the two visible products would fail."
    },
    "pitfall": "Do not say the Higgs field creates all mass around us. It sets elementary mass parameters, while most ordinary proton and neutron mass arises from strong-interaction energy.",
    "practice": [
      {
        "question": "Why does a successful Higgs mechanism not make the Standard Model a theory of gravity?",
        "hint": "Separate particle mass generation from spacetime dynamics.",
        "answer": "The Higgs mechanism belongs to electroweak quantum field theory. It neither quantizes gravity nor replaces the equations of general relativity."
      },
      {
        "question": "Find the charges of proton uud and neutron udd when q_u = +2e/3 and q_d = -e/3.",
        "hint": "Add the three valence-quark charges.",
        "answer": "Proton: 2/3 + 2/3 - 1/3 = +1, or +e. Neutron: 2/3 - 1/3 - 1/3 = 0."
      }
    ]
  },
  "15.1": {
    "topicId": "15.1",
    "question": "How can distance, power, composition, and motion of an unreachable object be inferred from only angles, flux, and its light spectrum?",
    "overview": [
      "Astronomical measurement is usually an inverse problem: a telescope records angles, times, flux, and spectra, while a physical model connects them to source properties. Geometric parallax calibrates the nearby distance scale, after which objects of calibrated luminosity carry the scale farther.",
      "Flux at the telescope is not source luminosity: for isotropic emission without absorption, F = L/(4πd²). Continuum shape and lines carry temperature, composition, and motion information, but redshift may be Doppler, gravitational, or cosmological, so interpretation requires context."
    ],
    "conceptExplanations": [
      "At small angle, linear size D and angular size θ obey D ≈ dθ when θ is in radians. Annual parallax uses a known orbital baseline: distance in parsecs equals 1/p when p is in arcseconds.",
      "A standard candle need not be an identical object; it is a class with calibratable absolute luminosity, for example from a period or light-curve shape. A calibration error on one rung propagates into later distance-ladder rungs.",
      "Luminosity L is source energy per time, while flux F is power per area at the observer. Magnitude is logarithmic: a five-magnitude difference corresponds to a flux ratio of 100.",
      "Temperature is inferred from the continuum with a stellar-atmosphere correction, composition from lines and ionization models, and radial velocity from Doppler shift. One spectrum often contains degeneracies among temperature, density, chemistry, dust, and motion.",
      "Redshift z = (λobs - λemit)/λemit is directly measured. At small Doppler speed z ≈ vᵣ/c, but a distant galaxy's z is related to scale-factor change and a cosmological model rather than one elementary velocity equation."
    ],
    "boundary": "The relations d = 1/p and F = L/(4πd²) require correct parallax geometry and isotropic propagation without unmodeled extinction or lensing. At large z, distance, age, and velocity cannot be inferred without a chosen cosmology and distance definition.",
    "example": {
      "title": "Distance and Luminosity from Parallax",
      "problem": "A star has parallax 25.0 milliarcseconds and measured flux 2.0·10⁻¹² W/m². Estimate distance and luminosity, assuming isotropic emission and negligible extinction.",
      "steps": [
        "Convert p = 25.0 mas = 0.0250 arcseconds.",
        "d = 1/p = 40.0 pc = 40.0·3.086·10¹⁶ m ≈ 1.23·10¹⁸ m.",
        "Use L = 4πd²F.",
        "L ≈ 4π(1.23·10¹⁸)²·2.0·10⁻¹² W ≈ 3.8·10²⁵ W."
      ],
      "answer": "The distance is about 40 pc and luminosity about 3.8·10²⁵ W, roughly 0.10 solar luminosity.",
      "check": "Parallax below one arcsecond means distance above one parsec, and multiplying flux by the spherical area returns power."
    },
    "pitfall": "Do not label every redshift a recession velocity through v = cz. That is a small-z approximation, does not distinguish shift mechanisms, and fails for large cosmological redshift.",
    "practice": [
      {
        "question": "Why do standard candles still need independent geometric calibration?",
        "hint": "Flux is observed while luminosity and distance are both initially unknown.",
        "answer": "Without calibration, the class's absolute luminosity is unknown. Geometric distances connect observed flux to L and fix the method's zero point."
      },
      {
        "question": "A star has parallax 5.0 mas. What is its distance before any zero-point correction?",
        "hint": "Convert milliarcseconds to arcseconds first.",
        "answer": "p = 0.0050 arcseconds, so d = 1/0.0050 = 200 pc."
      }
    ]
  },
  "15.2": {
    "topicId": "15.2",
    "question": "How does a star balance gravity with pressure for billions of years and transport energy from a hot core to a cool surface?",
    "overview": [
      "Gravity tends to compress a star, heating matter and increasing gas and radiation pressure. In quasistatic equilibrium, the pressure gradient balances attraction on each layer: dP/dr = -GM(r)ρ(r)/r². This is a force balance, not a collision between oppositely directed energy streams.",
      "Nuclear reactions replenish energy lost at the surface and help maintain thermal structure. Energy travels through radiation, convection, and in some regimes conduction; neutrinos escape the core almost freely and provide a separate direct test of reactions there."
    ],
    "conceptExplanations": [
      "During contraction, part of gravitational energy heats matter through virial behavior, so a protostar shines before sustained fusion begins. Pressure depends on equation of state, composition, and temperature.",
      "Hydrostatic equilibrium locally relates the pressure gradient to enclosed mass M(r). It does not make a star permanent: structure evolves slowly as composition and energy sources change.",
      "With a modest temperature gradient, photons diffuse outward through repeated absorption and re-emission; where the stratification is convectively unstable, bulk matter transports energy. The dominant mechanism varies with layer and stellar mass.",
      "Fusion lowers product rest mass and releases the difference as particle and radiation energy. Reaction rates are temperature-sensitive and feed back on structure, but photons do not universally 'push outward against gravity' in every star.",
      "Solar neutrinos originate in branches of hydrogen-to-helium reactions and leave the Sun much faster than photon energy. Flavor change in transit explains the historical electron-neutrino deficit and confirms neutrino oscillations."
    ],
    "boundary": "A one-dimensional hydrostatic model assumes spherical symmetry and evolution slower than the dynamical time. Rapid rotation, strong magnetic fields, pulsation, mass loss, or explosion violate these assumptions; the pressure equation must be solved with mass, transport, composition, and equation-of-state equations.",
    "example": {
      "title": "Mass Equivalent of Solar Luminosity",
      "problem": "The Sun's electromagnetic luminosity is L = 3.83·10²⁶ W. What mass equivalent is radiated per second? Use c = 3.00·10⁸ m/s.",
      "steps": [
        "From E = mc², the equivalent mass-loss rate is ṁ = L/c².",
        "c² = 9.00·10¹⁶ m²/s².",
        "ṁ = 3.83·10²⁶/9.00·10¹⁶ kg/s ≈ 4.26·10⁹ kg/s."
      ],
      "answer": "The electromagnetic luminosity corresponds to about 4.3·10⁹ kg of mass equivalent per second.",
      "check": "This is not the full hydrogen fuel consumption rate: only a small reactant-mass fraction becomes energy, and neutrinos carry additional power."
    },
    "pitfall": "Hydrostatic balance is not 'a fusion explosion pushing outward.' A total-pressure gradient supports each layer, while reactions set the long-term thermal budget and thus help maintain that pressure structure.",
    "practice": [
      {
        "question": "Would stellar pressure vanish instantly if core reactions suddenly stopped?",
        "hint": "Separate stored internal energy from the source replenishing losses.",
        "answer": "No. Internal energy and pressure remain initially; the star then readjusts and contracts as it cools, on a timescale unrelated to one reaction time."
      },
      {
        "question": "Estimate solar flux at 1 AU = 1.496·10¹¹ m for L = 3.83·10²⁶ W.",
        "hint": "Use F = L/(4πr²).",
        "answer": "F ≈ 3.83·10²⁶/[4π(1.496·10¹¹)²] ≈ 1.36·10³ W/m²."
      }
    ]
  },
  "15.3": {
    "topicId": "15.3",
    "question": "Why does stellar mass determine a star's route across the Hertzsprung-Russell diagram and the elements it returns to interstellar space?",
    "overview": [
      "The Hertzsprung-Russell diagram compares luminosity with effective temperature or spectral class. It is not a direct age photograph, but with models and composition it reveals evolutionary stages: protostellar contraction, the main sequence, giant branches, and final remnants.",
      "On the main sequence, the core converts hydrogen into helium; later evolution depends sharply on initial mass. Reactions in stars and their ejecta create many nuclei through the iron group, while slow and rapid neutron capture build heavier elements in different environments including AGB stars and neutron-star mergers."
    ],
    "conceptExplanations": [
      "The vertical coordinate is commonly luminosity and the horizontal coordinate temperature, often decreasing to the right. Position also depends on metallicity, so one point cannot uniquely yield mass and age without more data.",
      "A cold cloud fragments and contracts when gravity overcomes thermal, turbulent, and magnetic support. A protostar shines through contraction before sustained hydrogen burning begins.",
      "A low-mass star ends as a white dwarf after giant phases; a massive core can collapse into a neutron star or black hole. A thermonuclear white-dwarf supernova is a different channel, so 'supernova' is not one universal sequence.",
      "Successive burning stages in massive stars build nuclei through the iron group, beyond which ordinary fusion no longer supplies energy. Stellar winds and explosions disperse products into gas for later stellar generations.",
      "The slow neutron-capture s-process is important, for example, in AGB stars; the r-process needs an enormous neutron flux and is observed in neutron-star-merger ejecta, with some rare explosive sources also possible. Origins differ by element and isotope."
    ],
    "boundary": "A simple lifetime t proportional to M/L with L proportional to M^α is only a range-limited main-sequence estimate; α varies with mass and composition. Real tracks require transport, mass loss, rotation, binarity, and nuclear-network models.",
    "example": {
      "title": "Why a Massive Star Lives Less Long",
      "problem": "In a crude limited-range approximation let L ∝ M^3.5 and available fuel ∝ M. If the solar main-sequence lifetime is 10 billion years, estimate it for a 2-solar-mass star.",
      "steps": [
        "Lifetime is roughly fuel divided by power: t ∝ M/L.",
        "With L ∝ M^3.5, t ∝ M^(-2.5).",
        "t(2M☉) ≈ 10 billion years/2^2.5.",
        "Since 2^2.5 ≈ 5.66, t ≈ 1.77 billion years."
      ],
      "answer": "The estimate is about 1.8 billion years on the main sequence.",
      "check": "Although more fuel exists, luminosity rises much faster than mass, shortening life; the number should not be extrapolated to every mass range."
    },
    "pitfall": "'All elements beyond iron form in supernovae' is too crude. The s-process, r-process, and other channels must be distinguished, and different isotopes receive different source contributions.",
    "practice": [
      {
        "question": "Can temperature alone on an H-R diagram determine a star's age?",
        "hint": "Compare a dwarf and giant of the same spectral class.",
        "answer": "No. At least luminosity and composition are needed, and usually mass or cluster membership plus comparison with evolutionary tracks."
      },
      {
        "question": "With the same crude model, estimate the main-sequence lifetime of a 3-solar-mass star.",
        "hint": "Use t ≈ 10 billion years·3^(-2.5).",
        "answer": "3^2.5 ≈ 15.6, giving t ≈ 0.64 billion years."
      }
    ]
  },
  "15.4": {
    "topicId": "15.4",
    "question": "Which quantum and relativistic mechanisms stop stellar-remnant collapse, and when can nothing stop it?",
    "overview": [
      "A white dwarf is supported mainly by electron degeneracy pressure, while a neutron star uses degeneracy and short-range nuclear interactions at much greater density. Each has limiting masses that depend on composition and equation of state; beyond the relevant boundary no stable object of that type exists.",
      "A black hole is defined by an event horizon, a causal boundary from which no signal reaches a distant observer. Observed radiation normally originates in hot accretion flow and jets outside it; the question of quantum-information preservation in evaporation exposes the limit of combining semiclassical gravity with quantum theory."
    ],
    "conceptExplanations": [
      "The Pauli principle produces electron degeneracy pressure even at low temperature. Relativistic changes in the equation of state yield a limit of order 1.4 solar masses for a nonrotating white dwarf, with the exact value depending on composition and conditions.",
      "A neutron star packs a stellar-scale mass into a radius of order tens of kilometers; support involves degeneracy and the strong interaction. A pulsar is a rotating magnetized neutron star whose beam periodically crosses Earth's direction.",
      "For a nonrotating uncharged mass, the horizon has Schwarzschild radius r_s = 2GM/c². It is not a solid surface; a local falling observer can cross it without hitting a material shell.",
      "Gas in a disk loses orbital energy and heats to high temperature. Jets are associated with magnetic fields of the disk and rotating compact object; they launch outside the horizon rather than escaping from within it.",
      "Hawking's semiclassical calculation assigns temperature and evaporation to a black hole, raising the question of recovering information from final radiation. No universally accepted complete microscopic account yet exists."
    ],
    "boundary": "The radius 2GM/c² describes the Schwarzschild metric for an isolated spherical nonrotating uncharged black hole. Real objects rotate, accrete, and occupy external fields; singularity behavior requires quantum gravity, so a classical prediction is not a measured interior structure.",
    "example": {
      "title": "Horizon Size of a Stellar Black Hole",
      "problem": "Estimate the Schwarzschild radius of a 10-solar-mass black hole using 2GM☉/c² ≈ 2.95 km.",
      "steps": [
        "Radius scales linearly with mass: r_s = (2GM☉/c²)(M/M☉).",
        "Insert M/M☉ = 10.",
        "r_s ≈ 2.95 km·10 = 29.5 km."
      ],
      "answer": "The Schwarzschild-model horizon radius is about 30 km.",
      "check": "This is radius, not diameter; a rotating hole has different horizon geometry and characteristic orbits."
    },
    "pitfall": "The dark disk in an Event Horizon Telescope image is not directly the horizon. It is a larger shadow formed by light capture and strong bending against emitting plasma.",
    "practice": [
      {
        "question": "Why does bright X-ray emission from a black-hole system not show light escaping from inside the horizon?",
        "hint": "Locate the hot gas relative to the horizon.",
        "answer": "The accretion flow radiates before crossing the horizon. Energy is released as matter moves and heats outside the causal boundary."
      },
      {
        "question": "A pulsar completes one rotation in 0.10 s. What pulse frequency is observed if one beam pulse appears per rotation?",
        "hint": "Use f = 1/T.",
        "answer": "f = 1/0.10 s = 10 Hz."
      }
    ]
  },
  "15.5": {
    "topicId": "15.5",
    "question": "Which measured angles, delays, frequency shifts, and detector distortions turn general-relativistic geometry into testable physics?",
    "overview": [
      "Curved spacetime changes paths of light and freely moving bodies: lenses produce shifts, arcs, and multiple images, while orbits acquire corrections to Newtonian precession. These effects test the theory and reconstruct mass distributions, including invisible matter.",
      "Proper time depends on motion and gravitational potential, so satellite navigation incorporates both special and general relativity. Accelerating nonspherical mass distributions produce gravitational waves; laser interferometers register them as extraordinarily small fractional changes in distance."
    ],
    "conceptExplanations": [
      "In a weak field a point mass deflects light by approximately α = 4GM/(bc²). Strong lensing makes arcs and multiple images, weak lensing is inferred statistically from many galaxy shapes, and microlensing from changing brightness.",
      "General relativity adds pericenter advance to an orbit. For a test particle in a weak field, Δφ = 6πGM/[a(1 - e²)c²] per orbit, but observed precession must also remove perturbations by other bodies and nonspherical gravity.",
      "Satellite clocks run slower from motion and faster from Earth's higher orbital potential; for GPS the main net shift is about +38 μs per day relative to the geoid. The full system also handles Earth rotation and signal propagation.",
      "A gravitational wave in general relativity carries transverse curvature changes at light speed and is generated by a changing quadrupole moment. A detector measures strain h = ΔL/L through the optical phase difference in perpendicular arms."
    ],
    "boundary": "The equations α = 4GM/(bc²) and weak-field precession assume an isolated source, weak gravity, and suitable geometry. Real lensing requires a mass distribution and distance geometry, GPS a relativistic coordinate system, and wave extraction a calibrated detector-noise model.",
    "example": {
      "title": "Light Deflection at the Solar Limb",
      "problem": "Estimate deflection at the solar limb using solar Schwarzschild radius 2GM☉/c² = 2.95 km and R☉ = 6.96·10⁵ km.",
      "steps": [
        "For b ≈ R☉, α = 4GM☉/(bc²) = 2r_s/b.",
        "α ≈ 2·2.95/(6.96·10⁵) rad = 8.48·10⁻⁶ rad.",
        "Multiply by 206265 arcseconds per radian.",
        "α ≈ 1.75 arcseconds."
      ],
      "answer": "The full relativistic deflection at the Sun's limb is about 1.75 arcseconds.",
      "check": "The small angle matches the weak solar field; a Newtonian corpuscular estimate would give half the full value."
    },
    "pitfall": "GPS is not an example of gravitational time dilation alone. Orbital speed slows satellite clocks, higher potential speeds them relative to ground clocks, and the working correction includes both plus a coordinate-time convention.",
    "practice": [
      {
        "question": "Why does a gravitational-lensing map measure total projected mass rather than only luminous stars?",
        "hint": "A light geodesic responds to the source of curvature, not its brightness.",
        "answer": "Deflection depends on the gravitational field of all mass-energy along the line of sight, so lensing also reveals components that emit almost no light."
      },
      {
        "question": "What range-error scale corresponds to an uncorrected 38 μs clock difference per day when multiplied by c?",
        "hint": "Use c ≈ 3.00·10⁸ m/s.",
        "answer": "cΔt ≈ 3.00·10⁸·38·10⁻⁶ m ≈ 1.14·10⁴ m, about 11 km per day as an order-of-magnitude scale."
      }
    ]
  },
  "15.6": {
    "topicId": "15.6",
    "question": "Why do independent measurements of motion, lensing, and structure growth require an additional gravitating component that barely interacts with light?",
    "overview": [
      "Stars, gas, dust, and central compact objects form a galaxy's visible component, but their motions probe the total potential. Flat outer rotation curves mean enclosed mass keeps growing beyond most light if orbits are nearly circular and the model approximately stationary.",
      "Clusters provide independent estimates from galaxy velocities, gas temperature, and gravitational lensing. Together with the cosmic microwave background and cosmic web, the data fit cold dark matter, although its microscopic identity remains unknown and every observation carries astrophysical systematics."
    ],
    "conceptExplanations": [
      "Galaxies contain disks, bulges, gas, and halos and evolve through star formation, accretion, and mergers. A speed alone does not reveal mass without a geometric and dynamical model.",
      "For a circular orbit in a spherical approximation, v² = GM(r)/r. If v stays nearly constant with r, then M(r) is approximately proportional to r rather than approaching the Keplerian decline outside concentrated luminous mass.",
      "Lensing measures projected total mass, while hot X-ray gas and galaxy motions probe the potential differently. Separation between gas and the main lensing mass in colliding clusters is particularly constraining.",
      "Small primordial inhomogeneities grow gravitationally into nodes, filaments, and voids. Dark matter starts clustering without photon pressure before baryon recombination and supplies a gravitational scaffold for later gas.",
      "The evidence is cross-scale consistency, not one rotation curve. Alternative gravity laws must also explain lensing, clusters, the background spectrum, and structure formation simultaneously."
    ],
    "boundary": "M = v²r/G assumes circular motion and spherical mass distribution; disk inclination, nonsphericity, and disequilibrium add corrections. Lensing gives projected mass and depends on distance geometry, while 'dark matter' does not identify a particular particle.",
    "example": {
      "title": "Mass Inside an Outer Galactic Orbit",
      "problem": "Gas follows a nearly circular orbit at 220 km/s and radius 20 kpc. Estimate enclosed mass in a spherical model. Use G = 6.674·10⁻¹¹ SI and M☉ = 1.988·10³⁰ kg.",
      "steps": [
        "Convert v = 2.20·10⁵ m/s and r = 20·3.086·10¹⁹ m = 6.17·10²⁰ m.",
        "From v²/r = GM/r², M = v²r/G.",
        "M ≈ (2.20·10⁵)²·6.17·10²⁰/(6.674·10⁻¹¹) kg ≈ 4.48·10⁴¹ kg.",
        "In solar masses, M ≈ 4.48·10⁴¹/1.988·10³⁰ ≈ 2.25·10¹¹M☉."
      ],
      "answer": "The adopted spherical model gives about 2.3·10¹¹ solar masses inside 20 kpc.",
      "check": "With a flat curve, doubling r doubles estimated M(r), so mass keeps accumulating beyond the bright disk."
    },
    "pitfall": "Dark matter is not merely cold ordinary gas or a collection of ordinary black holes. Primordial nucleosynthesis and the microwave background independently constrain the baryonic matter inventory.",
    "practice": [
      {
        "question": "How would outer speed v(r) behave if nearly all mass were concentrated inside the visible disk?",
        "hint": "Set M(r) approximately constant in v² = GM/r.",
        "answer": "Speed would fall roughly as r^(-1/2). A nearly constant observed speed requires a different mass profile or a modified dynamical law."
      },
      {
        "question": "At the same 220 km/s, estimate mass inside 10 kpc using the same model.",
        "hint": "At fixed v, the result is proportional to r.",
        "answer": "About 1.13·10¹¹M☉, half the 20 kpc estimate."
      }
    ]
  },
  "15.7": {
    "topicId": "15.7",
    "question": "Which observations connect current expansion to a hot early state, and why is a horizon not an edge of space?",
    "overview": [
      "In a homogeneous cosmological model, separation between unbound comoving objects grows with scale factor a(t). At small redshift, the Hubble-Lemaître law v ≈ H₀d relates recession rate to distance; this is metric expansion, not debris flying from a central point into preexisting empty space.",
      "The hot model explains primordial light-nucleus abundances and the nearly thermal microwave background released after neutral atoms formed. Observed late acceleration is represented by a cosmological constant in baseline ΛCDM, but dark-energy physics, the expansion rate, and the earliest epochs remain open questions."
    ],
    "conceptExplanations": [
      "At small distance, Hubble velocity is proportional to d, but gravitationally bound systems need not expand with the cosmic scale factor. At large distance, recession speed is coordinate-dependent and may exceed c without local superluminal motion.",
      "The hot Big Bang is a model of evolution from a dense hot state, not a reliable extrapolation through an arbitrary singularity. It has no center within space and does not itself answer what caused the initial conditions.",
      "During the first minutes, a reaction network made mostly hydrogen, helium, and traces of light nuclides. Roughly 380,000 years later photons decoupled from matter; their stretched spectrum is now the cosmic microwave background.",
      "Distant supernova faintness relative to a decelerating model and other data indicate acceleration. ΛCDM assigns dark energy constant density, while observations test its equation of state and possible evolution.",
      "The observable Universe is bounded by our past light cone and finite age, not a wall. The particle horizon, Hubble radius, and event horizon are distinct surfaces; the entire Universe may be much larger or infinite.",
      "Open questions include dark-component identity, tension among H₀ measurements, inflation physics, and baryon-asymmetry origin. Parameter uncertainty does not erase independent evidence for a hot expanding past."
    ],
    "boundary": "The linear law v = H₀d and z ≈ v/c apply when z is much less than one. For distant objects, luminosity distance, angular-diameter distance, age, and comoving distance differ and require integration of a chosen H(z); measured H₀ depends on method and calibration.",
    "example": {
      "title": "A Nearby Galaxy in the Hubble-Lemaître Law",
      "problem": "For H₀ = 70 km/(s·Mpc), estimate cosmological recession speed and small redshift of a galaxy at 100 Mpc, neglecting peculiar velocity.",
      "steps": [
        "v ≈ H₀d = 70·100 km/s = 7000 km/s.",
        "Because v is much smaller than c, use z ≈ v/c.",
        "z ≈ 7000/299792 ≈ 0.0233."
      ],
      "answer": "The estimate is 7000 km/s and z ≈ 0.023.",
      "check": "v/c is about 2.3%, so the linear approximation is reasonable, though real data include peculiar velocity and calibration uncertainty."
    },
    "pitfall": "Do not picture the Big Bang as matter exploding from one point into surrounding emptiness. In the standard homogeneous model, distances among comoving points of space grow and no geometric center is selected.",
    "practice": [
      {
        "question": "Why do atoms, people, and the Solar System not grow in proportion to the scale factor?",
        "hint": "Compare cosmic expansion with local binding forces and gravity.",
        "answer": "Bound systems have their own electromagnetic or gravitational equilibrium; homogeneous expansion describes unbound large scales."
      },
      {
        "question": "For H₀ = 70 km/(s·Mpc), estimate v and z for a galaxy at 50 Mpc.",
        "hint": "First use v = H₀d, then z ≈ v/c.",
        "answer": "v ≈ 3500 km/s and z ≈ 3500/299792 ≈ 0.0117."
      }
    ]
  },
  "16.1": {
    "topicId": "16.1",
    "question": "How do nonlinear dependence and a closed feedback loop create thresholds, saturation, and multiple possible regimes?",
    "overview": [
      "A linear model preserves sums and scale: its response to ax₁ + bx₂ is a times the response to x₁ plus b times the response to x₂. This is a powerful local approximation, but real systems often contain products, powers, resource limits, or state-dependent coefficients, so independent inputs can no longer simply be added.",
      "Feedback returns part of the output to the input. Negative feedback near an operating point usually suppresses a deviation, while positive feedback amplifies it; a stable finite regime requires sufficiently small loop gain or nonlinear saturation, loss, or another stabilizing mechanism."
    ],
    "conceptExplanations": [
      "A linear operator L obeys L(ax + by) = aL(x) + bL(y). An affine relation with a constant offset is not strictly linear, although it is often called a linear trend after choosing an origin.",
      "In a nonlinear equation, a sum of two solutions is generally not a solution. Frequency may depend on amplitude, a small parameter change may cross a threshold, and scale interactions may generate new frequencies.",
      "Feedback sign belongs to the complete loop: a returned deviation is negative feedback if it reduces itself and positive if it enlarges itself. The same physical component may belong to loops of different signs.",
      "Stability asks whether a small disturbance decays, while saturation limits growth at large amplitude. A locally stable point need not withstand a large kick that crosses into another basin."
    ],
    "boundary": "Linearization describes sufficiently small disturbances around one operating point when derivatives are finite and higher terms are genuinely small. It can miss thresholds, distant attractors, and saturation; feedback sign is set by total closed-loop gain rather than one component's label.",
    "example": {
      "title": "Stability in a Logistic Growth Model",
      "problem": "For dx/dt = rx(1 - x/K), with r > 0 and K > 0, find equilibria and determine their local stability.",
      "steps": [
        "Equilibrium requires rx(1 - x/K) = 0, so x* = 0 or x* = K.",
        "The derivative of the right-hand side is f'(x) = r(1 - 2x/K).",
        "At x* = 0, f' = r > 0: a small positive perturbation grows, so the point is unstable.",
        "At x* = K, f' = -r < 0: perturbations decay, so the point is locally stable."
      ],
      "answer": "The zero state is unstable for a positive population, while saturation level K is stable.",
      "check": "For 0 < x < K, dx/dt is positive; above K it is negative, so flow points toward K from both sides of the admissible region."
    },
    "pitfall": "Positive feedback need not mean infinite explosion, and negative feedback does not guarantee stability. Delay, excessive gain, and phase shift can make a regulating loop oscillatory or unstable.",
    "practice": [
      {
        "question": "Why is F = kx² not a linear law even for constant k?",
        "hint": "Test the scaling x to 2x.",
        "answer": "F(2x) = 4kx², whereas linearity would require 2F(x). Superposition fails."
      },
      {
        "question": "In a logistic model r = 0.30 day⁻¹, K = 100, and x = 20. What is the instantaneous growth rate?",
        "hint": "Substitute into rx(1 - x/K).",
        "answer": "dx/dt = 0.30·20·(1 - 0.20) = 4.8 units per day."
      }
    ]
  },
  "16.2": {
    "topicId": "16.2",
    "question": "How does trajectory geometry in state space reveal stable regimes and their qualitative restructuring as a parameter changes?",
    "overview": [
      "A dynamical-system state is the smallest variable set that, with the evolution law, predicts the next state. Each state is a point in phase space and a solution becomes a trajectory, so stability and transitions can be studied without plotting every coordinate against time.",
      "A fixed point, limit cycle, or more complicated invariant set is an attractor when neighboring trajectories approach it. Smooth parameter variation can qualitatively change the number or stability of these regimes; that event is a bifurcation."
    ],
    "conceptExplanations": [
      "For n first-order equations, state is normally an n-component vector. An oscillator needs position and velocity together; position alone does not determine its direction of subsequent motion.",
      "At a fixed point the state-space velocity is zero. A limit cycle is an isolated closed orbit that other trajectories may approach; not every closed curve is an attractor.",
      "Before a critical parameter, a system may return to one regime and afterward move toward two new states or an oscillation. Smooth coefficients do not guarantee a smoothly changing long-term qualitative response.",
      "A bifurcation is defined by changed topology or stability of invariant regimes, not merely rapid numerical growth. Classification depends on symmetry, dimension, and nonlinear terms."
    ],
    "boundary": "A phase portrait belongs to a specific autonomous model and variable set. Projection from high dimension can create false crossings; noise blurs an attractor, and a finite parameter sweep may miss hysteresis. A local normal form is valid only near its bifurcation.",
    "example": {
      "title": "A Supercritical Pitchfork Bifurcation",
      "problem": "Analyze equilibria of dx/dt = μx - x³ as parameter μ crosses zero.",
      "steps": [
        "Solve x(μ - x²) = 0: x* = 0 always, plus x* = ±√μ when μ > 0.",
        "Local stability follows from f'(x) = μ - 3x².",
        "For μ < 0, f'(0) = μ < 0, so zero is stable.",
        "For μ > 0, zero is unstable, while at ±√μ, f' = μ - 3μ = -2μ < 0, so both new points are stable."
      ],
      "answer": "At μ = 0 one stable branch loses stability and two symmetric stable branches appear: a supercritical pitchfork bifurcation.",
      "check": "The new solutions exist only for μ > 0 and continuously approach zero as μ approaches zero from above, as this normal form requires."
    },
    "pitfall": "A plot that resembles branching does not prove a bifurcation. One must demonstrate changing stable solutions with the parameter and exclude transients, noise, and insufficient settling time.",
    "practice": [
      {
        "question": "Why can two trajectories of a smooth autonomous system not cross in full phase space?",
        "hint": "At an intersection, one state would have two different future directions.",
        "answer": "Solution uniqueness assigns one velocity vector to each state. An apparent crossing can occur only in projection, with nonsmooth dynamics, or with missing variables."
      },
      {
        "question": "For μ = 0.04, find every equilibrium of μx - x³ and its stability.",
        "hint": "Use x* = 0, ±√μ and the sign of μ - 3x*².",
        "answer": "The points are 0 and ±0.20. Zero is unstable and both ±0.20 points are stable."
      }
    ]
  },
  "16.3": {
    "topicId": "16.3",
    "question": "How can a deterministic law be exact yet provide only a finite horizon of practical prediction?",
    "overview": [
      "In a chaotic regime, nearby initial states separate on average exponentially: δ(t) ≈ δ₀e^(λt) for a positive largest Lyapunov exponent while separation remains small. Initial error is never zero, so the time to reach an allowed error grows only logarithmically with measurement precision.",
      "Chaos occurs in nonlinear deterministic systems such as some regimes of the logistic map and double pendulum. It differs from external noise in origin, although finite short records can make them hard to distinguish; detailed long-term phase is lost while statistical properties and short forecasts may remain robust."
    ],
    "conceptExplanations": [
      "Sensitivity means growth of a small perturbation, not that any two points become unrelated immediately. Once separation reaches attractor size, the exponential formula saturates and no longer describes literal distance.",
      "For allowed error δmax, horizon t_h ≈ λ⁻¹ln(δmax/δ₀). One extra digit of initial precision adds roughly a constant amount of time rather than multiplying the horizon manyfold.",
      "The logistic map xₙ₊₁ = rxₙ(1 - xₙ) changes stable regimes with r; it is not chaotic for every r. A double pendulum likewise has regular low-energy regimes as well as chaotic regions.",
      "A stochastic process contains a random element in its model, while deterministic chaos has a unique evolution rule. Measurement noise, rounding, and hidden variables can make their time series look alike.",
      "Fractal structure means self-similar or scale-complex geometry with noninteger effective dimension in an ideal model. Real data span finite scales, so 'fractal' needs a quantitative scaling test."
    ],
    "boundary": "A Lyapunov exponent is an asymptotic property of a selected regime and metric; a short transient record can give a false sign. Exponential separation applies to small distances before saturation, and a positive model exponent does not prove experimental chaos without noise and dimension checks.",
    "example": {
      "title": "A Model Predictability Horizon",
      "problem": "Let initial error δ₀ = 10⁻⁶, allowed error δmax = 0.10, and largest Lyapunov exponent λ = 0.20 day⁻¹. Estimate the forecast horizon.",
      "steps": [
        "Set δmax = δ₀e^(λt_h).",
        "Then t_h = λ⁻¹ln(δmax/δ₀).",
        "The ratio is 0.10/10⁻⁶ = 10⁵ and ln(10⁵) ≈ 11.51.",
        "Thus t_h ≈ 11.51/0.20 days ≈ 57.6 days."
      ],
      "answer": "Within the supplied model, the horizon is about 58 days.",
      "check": "This is conditional on the stated λ and threshold, not the real weather limit; the linear separation formula is not used beyond the threshold."
    },
    "pitfall": "The butterfly effect does not say every small action causes any enormous event. It describes sensitivity of a particular trajectory in a chaotic regime and loss of detailed prediction, not absence of causality.",
    "practice": [
      {
        "question": "Why does close agreement with a short chaotic trajectory not ensure an accurate long-range forecast?",
        "hint": "Track how small parameter and initial-state errors grow with time.",
        "answer": "A positive Lyapunov exponent amplifies unavoidable errors exponentially; the model may correctly capture mechanism and statistics while losing the phase of one distant trajectory."
      },
      {
        "question": "At λ = 0.20 day⁻¹, how long does a small error take to double in the linear regime?",
        "hint": "Set e^(λt₂) = 2.",
        "answer": "t₂ = ln 2/0.20 ≈ 3.47 days."
      }
    ]
  },
  "16.4": {
    "topicId": "16.4",
    "question": "How do raw measurements from an unknown system become a model that survives a genuinely new-data test?",
    "overview": [
      "An investigation begins by preserving original values, units, timing, calibration, and experimental conditions. A falsifiable hypothesis is then stated and inputs, responses, and diagnostic plots are selected before fitting parameters; otherwise an attractive pattern is too easy to choose after seeing the data.",
      "Model quality is judged not only by closeness to training data but by residuals, uncertainties, parameter stability, and prediction of a held-out series. A failed forecast is useful: it points to a missing variable, an invalid domain, or unnecessary complexity."
    ],
    "conceptExplanations": [
      "Raw data should remain unchanged with metadata, while a separate clean table records reproducible transformations. Missing samples, sensor saturation, and reordered timestamps are physical-analysis issues, not mere formatting.",
      "A hypothesis must make a result that could be wrong and state its conditions. 'The dots look exponential' is weaker than 'after an impulse, the peak envelope decays at a constant fractional rate over this range.'",
      "Choose directly measured variables and derived features with units. Time plots, phase planes, and residuals answer different questions; a logarithmic plot is useful only for positive data and changes the error model.",
      "A fit gives parameters conditional on the selected model. Measurement uncertainty, correlations, drift, and parameter uncertainty differ; extra parameters almost always reduce training error and therefore need a penalty or external test.",
      "New data must be separated before final model selection. Random shuffling of a time series can leak future information into training; a later time block or an independent run is a more honest test."
    ],
    "boundary": "The exponential-envelope example assumes equally spaced peaks, one constant decay coefficient, and negligible background. A real claim needs uncertainties, correlated-residual analysis, and alternative comparison; held-out data cease to be independent after repeated use for model selection.",
    "example": {
      "title": "An Unknown Decaying Envelope",
      "problem": "Successive peaks 1.00 s apart have amplitudes 10.00, 6.07, and 3.68. Test A(t) = A₀e^(-γt) and predict the next peak before seeing it.",
      "steps": [
        "Adjacent ratios are 6.07/10.00 = 0.607 and 3.68/6.07 ≈ 0.606, nearly equal.",
        "For 1.00 s spacing, e^(-γΔt) ≈ 0.607, so γ ≈ -ln(0.607)/1.00 s ≈ 0.50 s⁻¹.",
        "Predict A(3 s) = 10.00e^(-0.50·3) ≈ 2.23.",
        "Only after recording the prediction should the new point be compared and its residual plotted."
      ],
      "answer": "The data support γ ≈ 0.50 s⁻¹ and give a provisional next-peak prediction A ≈ 2.23.",
      "check": "A constant ratio supports exponential rather than linear loss; three points still do not exclude an alternative model."
    },
    "pitfall": "A high R² does not prove a mechanism or guarantee prediction. Trend, autocorrelation, and extra parameters can make it nearly one for a wrong model; inspect dimensioned parameters and residual structure.",
    "practice": [
      {
        "question": "Why is random shuffling before a train/test split dangerous for a time-dependent experiment?",
        "hint": "Consider drift and information from future samples entering training.",
        "answer": "Neighboring points are correlated, and shuffling lets the model see nearly identical regimes and future drift. A later block or new run better represents real forecasting."
      },
      {
        "question": "Amplitude halves every 3.0 s: 8, 4, 2. Find exponential γ and predict the value 9.0 s after the first measurement.",
        "hint": "Use e^(-γ·3) = 1/2.",
        "answer": "γ = ln 2/3.0 ≈ 0.231 s⁻¹; after three periods A = 8·(1/2)³ = 1."
      }
    ]
  }
};
