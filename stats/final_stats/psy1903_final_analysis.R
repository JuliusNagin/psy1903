#### Load Packages & Set Working Directory ------
setwd("~/Desktop/psy1903/stats")
dir.create("final_stats")

if (!require("pacman")) {install.packages("pacman"); require("pacman")}

p_load("tidyverse","rstudioapi","lme4","emmeans","psych","corrplot","jsonlite")

setwd("~/Desktop/psy1903/stats/final_stats")

#### D-score Function --------------------------------
calculate_IAT_dscore <- function(data) {
  
  ## Step 2: Select only trials with rt > 300 ms and < 5000 ms (subset full data frame into new data frame called tmp)
  tmp <- data[data$rt > 300 & data$rt < 5000 & data$correct == TRUE,] 
  ## Step 3: Separate congruent and incongruent trials (subset tmp into two new data frames: congruent_trials and incongruent_trials)
  congruent_trials <- tmp[tmp$expectedCategoryAsDisplayed == "treatment or humanizing" | tmp$expectedCategoryAsDisplayed == "disorders or stigmatizing",]
  incongruent_trials <- tmp[tmp$expectedCategoryAsDisplayed == "treatment or stigmatizing" | tmp$expectedCategoryAsDisplayed == "disorders or humanizing",]
  
  ## Step 4: Calculate mean for congruent and mean for incongruent trials (mean_congruent, mean_incongruent)
  mean_congruent <- mean(congruent_trials$rt, na.rm = TRUE)
  mean_incongruent <- mean(incongruent_trials$rt, na.rm = TRUE)
  
  ## Step 5: Calculate standard deviation for all trials (pooled_sd)
  pooled_sd <- sd(tmp$rt, na.rm = TRUE)
  
  ## Step 6: Calculate D-score
  d_score <- (mean_incongruent - mean_congruent) / pooled_sd
  
  ## Step 7: Return D-score
  return(d_score)
}

#### Questionnaire Scoring Function ---------------
score_questionnaire <- function(data) {
  ## Extract questionnaire data cell
  json_data <- data[data$trialType == "questionnaire", "response"]
  ## Use fromJSON to convert from JSON to data frame
  questionnaire <- fromJSON(json_data)
  ## Convert to numeric
  questionnaire <- as.data.frame(lapply(questionnaire, as.numeric))
  
  ## Reverse score if necessary
  rev_items <- c("Q5", "Q6", "Q7", "Q8", "Q9")
  for (rev_item in rev_items) {
    questionnaire[,rev_item] <- 4 - questionnaire[,rev_item]
  }
  ## Calculate & return questionnaire score (mean)
  score <- rowMeans(questionnaire, na.rm = TRUE)
  return(score)
}

#### For Loop ------------------------------------------

## Set a variable called directory_path with the path to the location of your data csv files. This directory should *only* 
# contain your raw participant csv data files and no other files.
directory_path <- "~/Desktop/psy1903/osfstorage-archive"

## Create a list of all the files in that directory.
files_list <- list.files(path = directory_path, pattern = "\\.csv$", full.names = TRUE)

## Create an empty data frame called dScores that has two columns (IAT) or three columns (EST) and as many rows as you have data files (e.g., participants)
## IAT Version
dScores <- data.frame(matrix(nrow = length(files_list), ncol = 4))

## Rename the default column names to something meaningful
## IAT Version
colnames(dScores) <- c("participant_ID", "whichPrime", "d_score", "questionnaire")

## Initiate variable i to represent row numbers for each iteration, starting with 1
i = 1

## Now fill in the remaining code following the commented instructions:
# file <- files_list[[1]] # for testing purposes
## Step 1: Initiate a for loop that iterates across each file in files_list
for (file in files_list) {
  ## Step 2: Use read.csv to read in your file as a temporary data frame called tmp
  tmp <- read.csv(file) 
  
  #Week12 loop update: scale level correction-- response time already numeric  
  tmp$correct <- as.logical(tmp$correct) 
  tmp$expectedCategory <- as.factor(tmp$expectedCategory)
  tmp$expectedCategoryAsDisplayed <- as.factor(tmp$expectedCategoryAsDisplayed)
  tmp$leftCategory <- as.factor(tmp$leftCategory)
  tmp$rightCategory <- as.factor(tmp$rightCategory)
  
  ## Step 3: Assign participant_ID as the basename of the file
  participant_ID <- tools::file_path_sans_ext(basename(file))
  
  ## Step 4: Isolate the participant_ID column for the current row number (i) and assign it to be the current participant_ID variable
  dScores[i, "participant_ID"] <- participant_ID
  
  ##Week12: Following the logic of assigning the participant_ID to a single cell, assign the dScores "whichPrime" column to be the current participant's prime label. 
  dScores[i, "whichPrime"] <- tmp[tmp$trialType == "prime", "whichPrime"]
  
  ## Step 5: Using similar logic, isolate the d_score column for the current row number (i) and assign it to be the current d-score by using our calculate_IAT_dscore on the tmp data file
  dScores[i, "d_score"] <- calculate_IAT_dscore(tmp)
  
  ## Week 12: Following the logic of assigning the "d_score" column to be the output of the calculate_*_dScore function, assign the "questionnaire" column to be the output of the score_questionnaire function.
  dScores[i, "questionnaire"] <- score_questionnaire(tmp)
  
  ## Step 6: Remove the temporary data file tmp  
  rm(tmp)
  ## Step 7: Increase our row number variable i by one for the next iteration
  i <- i + 1
}

## Step 8: Check your dScores data frame after you've run your for loop
dScores$whichPrime <- as.factor(dScores$whichPrime)

## Outside of the for loop, save the new dScores data frame using write.csv() into your data_cleaning/data subdirectory:
write.csv(dScores,"~/Desktop/psy1903/stats/data_cleaning/data/participant_dScores.csv", row.names = FALSE)

#### ANOVA -------------------------------------------
psy1903finaldata <- read.csv("~/Desktop/psy1903/stats/data_cleaning/data/participant_dScores.csv")
anova_ <- aov(d_score ~ whichPrime, data = psy1903finaldata ) 
summary(anova_)

#### T-Test ---------------------------------------------

TukeyHSD(anova_)

#### Correlation ---------------------------------------

cor.test(psy1903finaldata$d_score, psy1903finaldata$questionnaire)

#### Base R Histogram -------------------------------

hist(psy1903finaldata$d_score, 
     xlab = "D Scores", 
     ylab = "Frequency", 
     main = "Distribution of D-Scores"
)

#### ggplot Histogram --------------------------------

ggplot(psy1903finaldata, aes(x = d_score))+ 
  geom_histogram(
    binwidth = 0.2, 
    fill = "skyblue",
    col = "black"
  )+ 
  labs(title = "Distribution of D-Scores", 
       x = "D-Scores",
       y =  "Frequency")+ 
  theme_minimal()

#### ggplot Histogram by Prime ---------------------

ggplot(psy1903finaldata, aes(x = d_score))+ 
  geom_histogram(
    binwidth = 0.25, 
    fill = "skyblue",
    col = "black"
  )+ 
  facet_wrap(~whichPrime)+
  labs(title = "Distribution of D-Scores", 
       x = "D-Scores",
       y =  "Frequency")+ 
  theme_classic()

#### ggplot Box Plot ----------------------------------
ggplot(psy1903finaldata, aes(x= whichPrime, y= d_score))+ 
  geom_boxplot(aes(fill= whichPrime))+ 
  theme_classic()+
  theme(legend.position = "none")+
  scale_x_discrete(
    labels = c(
      "harvard" = "Home at Harvard",
      "degree" = "Degrees of Difficulty")
  )+
  labs(title = "Effect of Prime on D-Scores", 
       x = "Prime Condition",
       y =  "D-Scores") 

#### ggplot Scatter Plot -------------------------------
ggplot(psy1903finaldata, aes(x= questionnaire, y= d_score))+ 
  geom_point()+ 
  geom_smooth(method=lm)+ 
  labs(title = "Correlation Between Questionnaire and D-Scores", 
       x = "Questionnaire",
       y =  "D-Scores")+ 
  theme_classic()

#### ggplot Custom Theme ---------------------------
ggplot(psy1903finaldata, aes(x= questionnaire, y= d_score))+ 
  geom_point(color = "blue")+ 
  geom_smooth(method=lm, color = "red")+ 
  labs(title = "Correlation Between Questionnaire and D-Scores",
       subtitle = "Comparing scores: stigmatizing mental health attitudes and treatment/condition implicit biases",
       x = "Questionnaire",
       y =  "D-Scores")+ 
  theme(plot.title = element_text(family = 'serif', face = "bold", hjust = 0.5, size = 14), 
        axis.title = element_text(family = 'serif', face = "bold", hjust = 0.5, size = 12),
        plot.subtitle = element_text(family = 'serif', face = "italic", hjust = 0.5, size = 10),
        panel.grid.minor = element_blank(),
        panel.grid.major = element_blank(),
        panel.border = element_rect(color = "black", linewidth = 0.5, fill = NA),
        plot.background = element_rect(fill = "#FFFFF0", color = NA),
  )