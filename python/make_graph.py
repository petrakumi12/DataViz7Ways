import altair as alt
import matplotlib.pyplot as plt
import pandas as pd
import plotly.graph_objects as go
import seaborn as sns
import numpy as np

color_dict = {
    'manufacturer_ford': '#ABAF20',
    'manufacturer_bmw': '#F1B3B1',
    'manufacturer_honda': '#87D4B4',
    'manufacturer_mercedes': '#8ECFF0',
    'manufacturer_toyota': '#EAAEEF',
    'gridlines': '#949595',
    'left_border': '#F3F3F3',
    'plot_background': '#ECECEC'
}

just_manufacturers = {
    'ford': '#ABAF20',
    'bmw': '#F1B3B1',
    'honda': '#87D4B4',
    'mercedes': '#8ECFF0',
    'toyota': '#EAAEEF',
}


def save_improved_dataset():
    df = pd.read_csv(r"C:\Users\Petra Kumi\IdeaProjects\02-DataVis-7ways\cars-sample.csv")
    dfDummies = pd.get_dummies(df['Manufacturer'], prefix='manufacturer')
    df = pd.concat([df[['MPG', 'Weight']], dfDummies], axis=1)
    df = df.dropna()
    print(df.columns)
    pd.DataFrame.to_csv(df, '../cars-sample-improved.csv')


def make_dataset():
    df = pd.read_csv(r"C:\Users\Petra Kumi\IdeaProjects\02-DataVis-7ways\cars-sample.csv")
    dfDummies = pd.get_dummies(df['Manufacturer'], prefix='manufacturer')
    df = pd.concat([df[['MPG', 'Weight']], dfDummies], axis=1)
    df = df.dropna()
    dict = {}
    for i in range(len(df.iloc[0]) - 5, len(df.iloc[0])):
        temp = df.loc[df.iloc[:, i] == 1]
        temp = temp[['MPG', 'Weight']]
        dict[df.columns[i]] = temp
    return dict


def personalize_plot():
    ax = plt.gca()
    ax.set_facecolor(color_dict['plot_background'])  ## set background color
    ax.set_yticks([10., 20., 30., 40.], minor=False)  ## set values for ticks
    ax.set_yticks([15., 25., 35., 45.], minor=True)
    ax.set_xticks([2000., 3000., 4000., 5000.], minor=False)
    ax.set_xticks([2500., 3500., 4500.], minor=True)
    ax.spines['bottom'].set_visible(False)  ## remove all except left border
    ax.spines['right'].set_visible(False)
    ax.spines['top'].set_visible(False)
    ax.spines['left'].set_color(color_dict['left_border'])  ## change color of left border
    ax.tick_params(axis='both', colors=color_dict['gridlines'])  ##
    ax.set_axisbelow(True)

    plt.grid(b=True, which='major', color='#FBFBFB', axis='both', linewidth=2)
    plt.grid(b=True, which='minor', axis='both', color='#FBFBFB', alpha=0.7)
    plt.tick_params(axis='both', which='minor', left=False, bottom=False)

    plt.xlabel("Weight")
    plt.ylabel("MPG")


def make_graph_matplotlib():
    dict = make_dataset()
    for key in dict.keys():
        df = dict[key]
        df = df.sort_values(by=['Weight'])
        plt.scatter(df['Weight'], df['MPG'], label=key.replace('manufacturer_', ''), marker='o', s=df['Weight'] / 40,
                    c=color_dict[key], alpha=0.5)
    plt.legend(loc='upper center', bbox_to_anchor=(1.2, 0.7))
    personalize_plot()
    plt.show()


def make_graph_plotly():
    data_dict = make_dataset()
    # print(pd.Series.to_numpy(data_dict['MPG']))

    fig = go.Figure()
    fig.update_layout(title={
        'text': "MPG vs Weight Plot",
        'y': 0.9,
        'x': 0.5,
        'xanchor': 'center',
        'yanchor': 'top'},
        xaxis=dict(
            title='Weight',
            tickmode='array',
            tickvals=[2000., 2500., 3000., 3500., 4000., 4500., 5000.],
            ticktext=[2000, '', 3000, '', 4000, '', 5000]
        ),
        yaxis=dict(
            title='MPG',  ## removing this line makes the graph show on entire screen for some reason
            tickmode='array',
            tickvals=[10., 15., 20., 25., 30., 35., 40., 45., ],
            ticktext=[10, '', 20, '', 30, '', 40, '']
        ),
        plot_bgcolor=color_dict['plot_background']
    )

    for key in data_dict.keys():
        df = data_dict[key]
        df = df.sort_values(by=['Weight'])
        fig.add_trace(go.Scatter(
            x=pd.Series.to_numpy(df['Weight']),
            y=pd.Series.to_numpy(df['MPG']),
            name=key.replace('manufacturer_', ''),
            mode='markers',
            marker_color=color_dict[key],
            marker_opacity=0.5,
            marker_size=df['Weight'] / 250
        ))
    fig.show()
    # return fig


def make_graph_altair():
    alt.renderers.enable('notebook')

    source = pd.read_csv(r"..\cars-sample.csv")
    chart = alt.Chart(source).mark_circle(size=60).encode(
        x='Weight:Q',
        y='MPG:Q'
        # tooltip=['Name', 'Origin', 'Horsepower', 'Miles_per_Gallon']
    ).interactive()
    return chart


def make_graph_seaborn():
    sns.set_style("darkgrid", {"axes.facecolor": ".9"})
    df = pd.read_csv(r"..\cars-sample.csv")

    num_ticks = 10
    # the index of the position of yticks
    xticks = np.linspace(1500, 5100, 8, dtype=np.int)
    # the content of labels of these yticks
    xticklabels = ["", 2000., "", 3000., "", 4000., "", 5000.]

    sns.scatterplot(x=df.Weight, y=df.MPG, data=df, s=df.Weight / 20, c='red', alpha=0.5, hue=df.Manufacturer,
                         palette=just_manufacturers)


    personalize_plot()
    plt.show()

make_graph_matplotlib()
make_graph_plotly()
make_graph_seaborn()

# make_graph_altair()
# make_graph_plotly()
# df = save_improved_dataset()
# pd.DataFrame.to_csv(make_dataset(), '../cars-sample-improved.csv')
