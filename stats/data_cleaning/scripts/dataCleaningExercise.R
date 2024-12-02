#### QUESTION 2:  Starting Out -------------------------------------
# 1. Open a blank RScript to write all of the following code (don't save it quite yet).

## 2. In your Console: Set your working directory to your psy1903/stats directory.
setwd("~/Desktop/psy1903/stats")
##The remaining steps should be completed in your RScript:

## 3. Using dir.create(): within your psy1903/stats/ directory create the following directories:
# data_cleaning (this will be the parent directory for our R exercises)
dir.create("data_cleaning")
# data_cleaning/output (data visualizations and plots will go here)
dir.create("data_cleaning/output")
# data_cleaning/scripts (this is where we'll save any scripts we create)
dir.create("data_cleaning/scripts")
# data_cleaning/data (if we save any intermediary or final data files, they will go here)
dir.create("data_cleaning/data")

## 4. Set your working directory to be "your_path/psy1903/stats/data_cleaning/scripts/"
setwd("~/Desktop/psy1903/stats/data_cleaning/scripts/")

## 5. Using pacman() and p_load(): Load packages ("tidyverse", "rstudioapi", "lme4", "emmeans", "psych", "corrplot", "jsonlite") #don't forget to add "jsonlite"
if (!require("pacman")) {install.packages("pacman"); require("pacman")}  
p_load("tidyverse","rstudioapi","lme4","emmeans","psych","corrplot", "jsonlite") 

## 6. Using read.csv(): Read in one participant's .csv file as a data frame called "iat_data1" or "est_data1"
# You should keep your experiment's data files in psy1903/osfstorage-archive. To read them in, you will just need to provide the whole path to the .csv file (e.g., ~/Desktop/psy1903/osfstorage-archive/file_name.csv) or the relative path to the .csv file (e.g., ../../../osfstorage-archive/file_name.csv)
iatdata1 <- read.csv("~/Desktop/psy1903/osfstorage-archive/iat-2024-11-05-22-01-17.csv") 

## 7. Examine your data frame using str() and summary(). Copy and paste the output of str() below (summary() is too long).
str(iatdata1)
summary(iatdata1)
## 8. Save your RScript within your new scripts directory as dataCleaningExercise.R

#### QUESTION 3:  Subsetting Data -------------------------------------
# Within your dataCleaningExercise.R script, do the following:
# 
#   1. Subset your iat_data1 or est_data1 data frame into a new data frame (iat_data2 or est_data2) so that it only includes the following:
#   
#   IAT:
#   Rows where the expectedCategoryAsDisplayed is one of the four combined categories (will require a series of or | conditionals in the row_index
#   Columns relevant to the IAT: "trial_index", "rt", "response", "word", "expectedCategory", "expectedCategoryAsDisplayed", "leftCategory", "rightCategory", "correct"

#   EST:
#   Rows where the block is not a practice block (will require a series of or | conditionals in the row_index, or a not-equals-to conditional in the row_index)
#   Columns that are relevant to the EST: "trial_index", "rt", "response", "block", "word", "valence", "color", "correct"
iatdata2 <- iatdata1[iatdata1$expectedCategoryAsDisplayed == "treatment or stigmatizing" |
                       iatdata1$expectedCategoryAsDisplayed == "disorders or humanizing" |
                       iatdata1$expectedCategoryAsDisplayed == "treatment or humanizing" |
                       iatdata1$expectedCategoryAsDisplayed == "disorders or stigmatizing",
                     c("trial_index", "rt", "response", "word", "expectedCategory", "expectedCategoryAsDisplayed", "leftCategory", "rightCategory", "correct")]
#   2. Using the str() and summary() functions, check the structure of your subsetted data files. 
str(iatdata2)  
summary(iatdata2)

#If your reaction time rt column is not numeric/integer, convert it to numeric with: iat_data2$rt <- round(as.numeric(iat_data2$rt), 0)
iatdata2$correct <- as.logical(iatdata2$correct)                                                                             
#If any of the following columns are not factors, convert them to factors with as.factor()
#                                                                                      
# IAT: expectedCategory, expectedCategoryAsDisplayed, leftCategory, rightCategory
# EST: block, valence, color
# Hint: You can do this a few different ways:
# You can make each column into a factor/integer one at a time based on the code from the notes.
# You can create a list of the column names (will need the assign operator <- and the concatenate c() function) and then create a for loop to iterate over each column name and convert it to a factor. For this to work, you must put the column name variable that you are iterating over in the column_index: iat_data2[, col_name] Using the dollar sign operator will not work because it cannot handle a dynamic variable (iat_data2$col_name will only look for a column named "col_name" directly even if you have already defined col_name <- "whichPrime")
iatdata2$expectedCategory <- as.factor(iatdata2$expectedCategory)
iatdata2$expectedCategoryAsDisplayed <- as.factor(iatdata2$expectedCategoryAsDisplayed)
iatdata2$leftCategory <- as.factor(iatdata2$leftCategory)
iatdata2$rightCategory <- as.factor(iatdata2$rightCategory)
#  3. Recheck the str() and summary() of your data frame. Paste the output of str() as your answer for this question.
str(iatdata2)

#### QUESTION 4:  Creating a Function -------------------------------------

## IAT
## Step 1: Specify your function with one argument, data
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
  
  ## Step 8: Return D-score
  return(d_score)
}

## Test out your function and see if you get a d-score
calculate_IAT_dscore(data)


#### QUESTION 5:  Putting it in a Loop and Creating New Data Files  -------------------------------------

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

#### Questionnaire Scoring -----------------------------------------------------

# ## Read in data file to a data frame called iat_test
# iat_test <- read.csv("~/Desktop/psy1903/stats/data_cleaning/data/my-iat-test-data.csv")
# 
# ## Extract questionnaire data
# json_data <- iat_test[iat_test$trialType == "Questionnaire", "response"]
# 
# ## Use fromJSON to Convert from JSON to data frame
# questionnaire <- fromJSON(json_data)
# str(questionnaire)
# 
# ## Convert to numeric
# questionnaire <- as.data.frame(lapply(questionnaire, as.numeric))
# 
# ## Reverse score if necessary
# rev_items <- c("question1", "question3", "question5", "question7")
# for (rev_item in rev_items) {
#   questionnaire[,rev_item] <- 5 - questionnaire[,rev_item]
# }
# 
# ## Calculate mean or sum score
# score <- rowMeans(questionnaire, na.rm = TRUE)

#### QUESTION 3: Week 12, Questionnaire Scoring Function Putting ----------------------

## Initiate function called score_questionnaire that accepts a single argument called `data`. Within this function...
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
#Testing
iatdata1 <- read.csv("~/Desktop/psy1903/osfstorage-archive/iat-2024-11-05-22-01-17.csv") 
score_questionnaire(iatdata1) 

#Testing out the function

#### Week 13 Task Set: Significance testing   ----------------------
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