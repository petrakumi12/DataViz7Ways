setwd('C:\\Users\\Petra Kumi\\IdeaProjects\\02-DataVis-7ways')
library(ggplot2)
library(data.table)
library(hash)

colors <- list()
colors[['bmw']] <- '#FF0C00'
colors[['ford']]<- #ACAF23'
colors[['honda']] <- '#0F9D58'
colors[['mercedes']] <- '#00A7FF'
colors[['toyota']] <- '#EB00FF'
colors[['bmw']]
a <- colors$bmw

df <- fread('cars-sample.csv')

df$Colour="black"
df$Colour[df$Manufacturer=='toyota']=colors$toyota
df$Colour[df$Manufacturer == 'mercedes']=colors$mercedes
df$Colour[df$Manufacturer == 'ford']=colors$ford
df$Colour[df$Manufacturer == 'bmw']=colors$bmw
df$Colour[df$Manufacturer == 'honda']=colors$honda
df


name_arr <- c('bmw', 'ford', 'honda', 'mercedes', 'toyota')
color_arr <- c( '#FF0C00', '#ACAF23', '#0F9D58', '#00A7FF','#EB00FF')
df

##clors_2 = hash(keys=name_arr, values=color_arr)

# Change the point size, and shape
ggplot(df, aes(x = Weight, y = MPG)) + 
  geom_point(aes(size=Weight), shape = 19, col=df$Colour, alpha=0.5)
