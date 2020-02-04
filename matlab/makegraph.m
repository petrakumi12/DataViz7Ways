function [] = makegraph()

color_struct.manufacturers = [[200 201 136]; [234 173 239]; [241 179 177]; [147 216 186]; [143 208 241]];
color_struct.gridlines = [148 149 149];
color_struct.left_border = [243 243 243];
color_struct.plot_background = [236 236 236];


T = readtable('../cars-sample-improved.csv');

% only selecting certain manufacturer data and plotting it
for i=4:8
    % get only MPG and weight for one manufacturer
    title = T.Properties.VariableNames(i);
    title = string(title{1}).replace('manufacturer_','');
    temp_arr = T{:,i};
    temp = T((temp_arr(:,1)==1),[2,3,i]);  
    % make into struct for easier indexing
    struct = table2struct(temp, "ToScalar", true);
    % scatterplot parameters
    cur_color = color_struct.manufacturers(i-3,:)/255;
    sc = scatter(struct.Weight, struct.MPG, struct.Weight/40, cur_color, 'filled', 'MarkerEdgeColor', cur_color);
    sc.MarkerFaceAlpha = .5;
    sc.MarkerEdgeAlpha = 1;
    legend_text(i-3) = title;
    legend(legend_text)
    hold on 
end

% adding more personalization to scatterplot
hold off
xlabel("Weight");
ylabel("MPG");
grid on;
grid minor;
ax = gca;
% ax.GridColor = color_struct.gridlines(1,:)/255;

% setting axis tick values
ax.XTick = [2000., 3000., 4000., 5000.];
ax.YTick = [10., 20., 30., 40.];
ax.XAxis.MinorTick = 'on';
ax.YAxis.MinorTick = 'on';
ax.XAxis.MinorTickValues = 2500:1000:4500;
ax.YAxis.MinorTickValues = 5:10:45;
% changing color of text and ticks
set(gca,'XColor',color_struct.gridlines(1,:)/255);
set(gca,'YColor',color_struct.gridlines(1,:)/255);


% changing background color
set(gca,'color',color_struct.plot_background(1,:)/255);
legend('Location','northeastoutside');
end