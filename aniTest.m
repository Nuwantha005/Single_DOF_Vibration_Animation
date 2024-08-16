% Spring parameters
numCoils = 5;        % Number of coils
springHeight = 7.5;    % Total height of the spring
radius = 0.5;         % Radius of the coils
numPoints = 1000;     % Number of points to plot

% Generate points for the spring
theta = linspace(pi/2, numCoils * 2 * pi + pi/2, numPoints);  % Angle for coils
zSpr = linspace(0, springHeight, numPoints);           % Height along the spring
xSpr = radius * cos(theta);                            % X coordinates
ySpr = radius * sin(theta);                            % Y coordinates
% Plot the spring in 2D (side view)

sprLocX = 1.5;
sprLocY = 5;

f = figure('Name',"Result");
f.Position = [1920/2-300/2 1080/2-600/2 300 600];

spring = plot(sprLocX+xSpr, sprLocY + zSpr, 'b-', 'LineWidth', 2);
axis([0,5,0,40])
grid on;
xlabel('Width (z)');
ylabel('Displacement (x)');
title('Single DOF Damped');
hold on

pistonBtmX = 3.5;
pistonBtmY = 5;
pistonR = 1;
pistonHeigt = 7.5;

massLocX = 2.5;
massLocY = 25;
massW = 3;
massH = 10;

pistonBtmPoints = [pistonBtmX-pistonR/2,pistonBtmY+pistonHeigt;
    pistonBtmX-pistonR/2, pistonBtmY;
    pistonBtmX+pistonR/2, pistonBtmY;
    pistonBtmX+pistonR/2, pistonBtmY+pistonHeigt;];
pistonBtm = plot(pistonBtmPoints(:,1), pistonBtmPoints(:,2), 'b-', 'LineWidth', 2);

pistonClrR = 0.1;
pistonClrH = pistonHeigt/2;
pistonTopPoints = [pistonBtmX-pistonR/2+pistonClrR/2, pistonBtmY+pistonClrH;
    pistonBtmX+pistonR/2-pistonClrR/2, pistonBtmY+pistonClrH;
    pistonBtmX,pistonBtmY+pistonClrH;
    pistonBtmX,massLocY-massH/2];

pistonTop = plot(pistonTopPoints(:,1), pistonTopPoints(:,2), 'b-', 'LineWidth', 2);
springTop = plot([sprLocX sprLocX],[sprLocY+springHeight massLocY-massH/2], 'b-', 'LineWidth', 2);

plot([sprLocX sprLocX],[0,sprLocY], 'b-', 'LineWidth', 2)
plot([pistonBtmX pistonBtmX],[0 pistonBtmY], 'b-', 'LineWidth', 2)



massP = [massLocX-massW/2, massLocY-massH/2;
    massLocX-massW/2, massLocY+massH/2;
    massLocX+massW/2, massLocY+massH/2;
    massLocX+massW/2, massLocY-massH/2;
    massLocX-massW/2, massLocY-massH/2;];

mass = fill(massP(:,1),massP(:,2),'c');

timeInfo = text(1.75,37.5,'Time: ' + string(num2str(t(1), '%.3f'))+ '/'+ string(max(t)),'Color','black','FontSize',14);
massDot = plot(massLocX,massLocY + x(1)*10,'ko','MarkerFaceColor','k');
pause(2)
for ii = 1:numel(t)
    %
    set(mass,'XData',massP(:,1),'YData',x(ii)*10+massP(:,2));
    set(pistonTop,'XData',pistonTopPoints(:,1),'YData',x(ii)*10+pistonTopPoints(:,2));
    set(springTop,'XData',[sprLocX sprLocX],'YData',x(ii)*10+[sprLocY+springHeight massLocY-massH/2]);
    sprScale = (springHeight + x(ii)*10) / springHeight;
    set(spring,'XData',sprLocX+xSpr,'YData',sprLocY + zSpr*sprScale);
    set(massDot,'YData',massLocY + x(ii)*10);
    set(timeInfo,'String','Time: ' +  string(sprintf('%.2f', t(ii))) + '/'+ string(max(t)));
    axis([0,5,0,40])
    pause(0.05)
end



