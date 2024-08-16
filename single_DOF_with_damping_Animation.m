%2024/6/30

clear; clc;

m = 15; c = 5; k = 160;   %system properties
omega_n = sqrt(k/m);
cc = 2*sqrt(m*k);
beta = c/cc;
x0 = 5; x0dot = 1;    %initial conditions

tMAX = 30;     %timespan of animation
t = linspace(0,tMAX,tMAX*100);
x = [];
env = [];
if beta < 1
    disp('Underdamped system')
    omega_d = sqrt(1-beta^2)*omega_n;

    shi = atan2(x0*omega_d,(x0dot+beta*omega_n*x0));
    X = x0 / sin(shi);
    env = X*exp(-beta*omega_n*t);
    %x = env .* cos(omega_d*t+shi);
    x = env .* sin(omega_d*t+shi);
elseif beta == 1
    disp('Critically damped system')
    x = (x0 + (x0dot+omega_n*x0)*t) .* exp(-omega_n*t);
elseif beta > 1
    disp('Overdamped system')
    s1 = (-beta + sqrt(beta^2-1))*omega_n;
    s2 = (-beta - sqrt(beta^2-1))*omega_n;

    c1 = (x0dot - s2*x0)/(s1-s2);
    c2 = x0 - c1;

    x = c1 * exp(s1*t) + c2 * exp(s2*t);
end

maxAM = max(abs(x));
lightBlue = [91 207 244]/255;

f = figure('Name',"Single DOF Damped");
f.Position = [1920/2-800/2 1080/2-600/2 800 600];

xDotLocX = 2.5; xDotLocY = maxAM*10;
Vdisp = -maxAM*10;

%Graph Plot
subplot(1,4,[1 2 3])
plot(t,x,'k','LineWidth',1.5,'Color','red');
axis([0,tMAX+tMAX/10,-maxAM*10,maxAM*6]);
title('Displacement Againts Time')
ylabel('Displacement (m)')
xlabel('Time (s)')
set(gca,'OuterPosition', [0, 0, 0.75, 1]);
box off
hold on
if beta < 1
    plot(t,env,'--','Color',lightBlue)      %Top Envelope Function
    plot(t,-env,'--','Color',lightBlue)     %Bottomh Envelope Function
end
GDot = plot(t(1),x(1),'ko','MarkerFaceColor','k');
HlineGraph = plot([t(1) tMAX+tMAX/10],[x(1) x(1)],'k--');


text(tMAX/10,-maxAM*5,'Mass: '+string(m)+' kg' + newline + ...
    'Damping Cefiicient: ' + string(c) + ' Ns/m' +  newline + ...
    'Spring Constant: ' + string(k) + ' N/m' + newline + newline + ...
    'Initial Displacement: ' + string(x0) + ' m' + newline + ...
    'Initial Velocity: ' + string(x0dot) + ' m/s' + newline + newline + ...
    'Natural Frequency: ' + string(omega_n) + ' rad/s' + newline + ...
    'Damping Ratio: ' + string(beta), ...
    'Color','black','FontSize',14,'horizontalAlignment', 'left', 'verticalAlignment', 'middle');


legend('Displacement','Top Envelop Function','Bottom Envelop Function','Location','northwest')


%Spring
% Spring parameters
sprLocX = 1.5;
sprLocY = Vdisp + maxAM*2;
numCoils = 5;        % Number of coils
springHeight = maxAM*3;    % Total height of the spring
radius = 0.5;         % Radius of the coils
numPoints = 100;     % Number of points to plot

% Generate points for the spring
theta = linspace(pi/2, numCoils * 2 * pi + pi/2, numPoints);  % Angle for coils
zSpr = linspace(0, springHeight, numPoints);           % Height along the spring
xSpr = radius * cos(theta);                            % X coordinates
ySpr = radius * sin(theta);                            % Y coordinates


%mass Parameters
massLocX = 2.5;massLocY = 0;massW = 3;massH = maxAM*4;
massP = [massLocX-massW/2, massLocY-massH/2;
    massLocX-massW/2, massLocY+massH/2;
    massLocX+massW/2, massLocY+massH/2;
    massLocX+massW/2, massLocY-massH/2;
    massLocX-massW/2, massLocY-massH/2;];


%Piston Bottom part parameters
pistonBtmX = 3.5;pistonBtmY = Vdisp+2*maxAM;pistonR = 1;pistonHeigt = maxAM*3;
pistonBtmPoints = [pistonBtmX-pistonR/2,pistonBtmY+pistonHeigt;
    pistonBtmX-pistonR/2, pistonBtmY;
    pistonBtmX+pistonR/2, pistonBtmY;
    pistonBtmX+pistonR/2, pistonBtmY+pistonHeigt;];

%Piston Top part parameters
pistonClrR = 0.1;
pistonClrH = pistonHeigt/2;
pistonTopPoints = [pistonBtmX-pistonR/2+pistonClrR/2, pistonBtmY+pistonClrH;
    pistonBtmX+pistonR/2-pistonClrR/2, pistonBtmY+pistonClrH;
    pistonBtmX,pistonBtmY+pistonClrH;
    pistonBtmX,massLocY-massH/2];

%Animation Plot
subplot(1,4,4)
title('Animation')
set(gca,'OuterPosition', [0.7, 0, 0.3, 1]);

sprScale = (springHeight + x(1)) / springHeight;
spring = plot(sprLocX+xSpr, sprLocY + zSpr*sprScale, 'b-', 'LineWidth', 2);
hold on
pistonBtm = plot(pistonBtmPoints(:,1), pistonBtmPoints(:,2), 'b-', 'LineWidth', 2);
pistonTop = plot(pistonTopPoints(:,1), x(1)+pistonTopPoints(:,2), 'b-', 'LineWidth', 2);
springTop = plot([sprLocX sprLocX],x(1)+[sprLocY+springHeight massLocY-massH/2], 'b-', 'LineWidth', 2);
mass = fill(massP(:,1),massP(:,2)+x(1),'g');

%Bottom Parts of Piston and String
plot([sprLocX sprLocX],[-maxAM*10,sprLocY], 'b-', 'LineWidth', 2)
plot([pistonBtmX pistonBtmX],[-maxAM*10 pistonBtmY], 'b-', 'LineWidth', 2)
%plot([0 5],[-maxAM*10 -maxAM*10],'b-','LineWidth', 2);

axis([0,5,-maxAM*10,maxAM*6]);
set(gca,'XAxisLocation','bottom', 'box','off', 'XTick', [])
set(gca,'YAxisLocation','right', 'box','off', 'YTick', [])

animeHline = plot([0 massLocX],[x(1) x(1)],'k--');
ADot = plot(massLocX,massLocY+x(1),'ko','MarkerFaceColor','k');
timeInfo = text(1,+maxAM*5, ...
    'Time: ' + string(num2str(t(1), '%.2f'))+ '/'+ string(max(t)), ...
    'Color','black','FontSize',16);

%Recording
% videoObject = VideoWriter('Single DOF_UnderDamped','MPEG-4');
% videoObject.FrameRate = 60;
% open(videoObject)
% v = VideoWriter('Single DOF_Animation_50fps.avi');
% open(v);
% gifFile = 'Single DOF_Animation Special.gif';
% exportgraphics(gcf, gifFile);

pause(2)

for ii=1:5:numel(t)
    set(mass,'XData',massP(:,1),'YData',x(ii)+massP(:,2));
    set(pistonTop,'XData',pistonTopPoints(:,1),'YData',x(ii)+pistonTopPoints(:,2));
    set(springTop,'XData',[sprLocX sprLocX],'YData',x(ii)+[sprLocY+springHeight massLocY-massH/2]);
    sprScale = (springHeight + x(ii)) / springHeight;
    set(spring,'XData',sprLocX+xSpr,'YData',sprLocY + zSpr*sprScale);
    set(ADot,'YData',massLocY + x(ii));
    set(timeInfo,'String','Time: ' +  string(sprintf('%.2f', t(ii))) + '/'+ string(max(t)));
    set(animeHline,'YData',[x(ii) x(ii)]);
    set(HlineGraph,'XData',[t(ii) max(t)+max(t)/10],'YData',[x(ii) x(ii)]);
    set(GDot,'XData',t(ii),'YData',x(ii));

    % frame = getframe(gcf);
    % writeVideo(v, frame);
    pause(1/60)
    %exportgraphics(gcf, gifFile, Append=true);
    %writeVideo(videoObject,getframe(gcf));
end

%close(videoObject)
% close(v)