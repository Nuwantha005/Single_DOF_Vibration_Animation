# Single_DOF_Vibration_Animation

Single degree of freedom systems contaion only one type of repetitive motion and therefore equation of motion is a single second order differencial equation.

$$ m \ddot{x} + c \dot{x} + kx = 0 $$

Solving this equation often uses assumption that solution is in the form of $x = X_0 e^{st}$ and substituting this will give following quadratic equation.

$$ ms^2 + cs + k = 0 $$

Solutions to this can be calculated from usual quadratic solution equation

$$ s_{1,2} = \frac{-c \pm \sqrt{c^2-2mk}}{2m} $$

Depending on the nature of the solutions of this quadratic equation, there are three ways the system can behave and those are discussed in the examples section.
There are several notations that were used in the programme for the convenience such as,

Natural Frequency,

$$ \omega_n = \sqrt\frac{k}{m} $$

Critica damping constant

$$ C_c = 2\sqrt{mk} = 2m\omega_n $$

Damping Ratio

$$ \beta = \frac{c}{C_c} $$

after using these notations, quadratic formula can be simplidied into following form,

$$ s_{1,2} = (-\beta \pm \sqrt{\beta^2-1})\omega_n $$

its clear that depending on beta's value the solution to the DE can have various forms. Those forms includeing $\beta = 0$ are discussed below.

## Examples
There are mainly 4 senarios that can be animated
### 1) No Damping
When damping coefficient is equal to zero (c = 0), there is no damping happening and harmonic motion continues forever.

![Single DOF_Animation No_Damping](https://github.com/user-attachments/assets/fed992ba-2f24-402e-a29b-c4f48180e07d)

### 2) Under Damped
When $\beta < 1$, s has two complex solutions and it leads to following form of solution known as underdapmed system.

$$ x(t) = X_0e^{-\beta\omega_n t} Sin(\omega_d t + \phi_0 ) $$

Where $X_0, \phi_0,$ and $\omega_d$ are amplitude, phase angle and frequency of oscillation and,

$$ \omega_d = \omega_n\sqrt{1-\beta^2} $$

![ezgif-6-48083a8be6](https://github.com/user-attachments/assets/a45fe65b-503b-4af9-ac03-f43637515b64)


### 3) Critically Damped
When $\beta = 1, s_1=s_2$.Because of that system is critically damped and it reaches the stability within shortest possible time. the solution to DE is in the following form

$$ x(t) = (c_1+c_2t)e^{\omega_n} $$

![Single DOF_Animation Critically_Damped](https://github.com/user-attachments/assets/6778bec2-3ba2-406e-9633-eafd5db58e47)


### 4) Overdamped
When $\beta > 1$, system has two real roots and solution has the following form,

$$ x(t) = c_1e^{s_1t}+c_2e^{s_2t} $$

![Single DOF_Animation Over_Damped](https://github.com/user-attachments/assets/7dcd24c3-a7fd-4eb1-a81a-315bfa31941e)

