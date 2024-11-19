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
  tmp <- data[data$rt > 300 & data$rt < 5000,]
  ## Step 3: Separate congruent and incongruent trials (subset tmp into two new data frames: congruent_trials and incongruent_trials)
  congruent_trials <- tmp[tmp$expectedCategoryAsDisplayed == "treatment or humanizing" | tmp$expectedCategoryAsDisplayed == "disorders or stigmatizing",]
  incongruent_trials <- tmp[tmp$expectedCategoryAsDisplayed == "treatment or stigmatizing" | tmp$expectedCategoryAsDisplayed == "disorders or humanizing",]
  
  ## Step 4: Calculate mean for congruent and mean for incongruent trials (mean_congruent, mean_incongruent)
  mean_congruent <- mean(congruent_trials$rt, na.rm = TRUE)
  mean_incongruent <- mean(incongruent_trials$rt, na.rm = TRUE)
  
  ## Step 5: Calculate standard deviation for all trials (pooled_sd)
  pooled_sd <- sd(tmp$rt, na.rm = TRUE)
  
  ## Step 6: Calculate D-score
  d_score <- (mean_congruent - mean_incongruent) / pooled_sd
  
  ## Step 7: Delete tmp file
  rm(tmp)
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
dScores <- data.frame(matrix(nrow = length(files_list), ncol = 2))

## Rename the default column names to something meaningful
## IAT Version
colnames(dScores) <- c("participant_ID", "d_score")

## Initiate variable i to represent row numbers for each iteration, starting with 1
i = 1



## Now fill in the remaining code following the commented instructions:
# file <- files_list[[1]] # for testing purposes
## Step 1: Initiate a for loop that iterates across each file in files_list
for (file in files_list) {
  ## Step 2: Use read.csv to read in your file as a temporary data frame called tmp
  tmp <- read.csv(file) 
  
  ## Step 3: Assign participant_ID as the basename of the file
  participant_ID <- tools::file_path_sans_ext(basename(file))
  
  ## Step 4: Isolate the participant_ID column for the current row number (i) and assign it to be the current participant_ID variable
  dScores[i, "participant_ID"] <- participant_ID
  ## Step 5: Using similar logic, isolate the d_score column for the current row number (i) and assign it to be the current d-score by using our calculate_IAT_dscore on the tmp data file
  dScores[i, "d_score"] <- calculate_IAT_dscore(tmp)
  
  ## Step 6: Remove the temporary data file tmp  
  rm(tmp)
  ## Step 7: Increase our row number variable i by one for the next iteration
  i <- i + 1
  
}
## Step 8: Check your dScores data frame after you've run your for loop


## Outside of the for loop, save the new dScores data frame using write.csv() into your data_cleaning/data subdirectory:
write.csv(dScores,"~/Desktop/psy1903/stats/data_cleaning/data/participant_dScores.csv", row.names = FALSE)

#### Questionnaire Scoring -----------------------------------------------------

## Read in data file to a data frame called iat_test
iat_test <- read.csv("~/Desktop/psy1903/stats/data_cleaning/data/my-iat-test-data.csv")

## Extract questionnaire data
json_data <- iat_test[iat_test$trialType == "Questionnaire", "response"]

## Use fromJSON to Convert from JSON to data frame
questionnaire <- fromJSON(json_data)
str(questionnaire)

## Convert to numeric
questionnaire <- as.data.frame(lapply(questionnaire, as.numeric))

## Reverse score if necessary
rev_items <- c("question1", "question3", "question5", "question7")
for (rev_item in rev_items) {
  questionnaire[,rev_item] <- 5 - questionnaire[,rev_item]
}

## Calculate mean or sum score
score <- rowMeans(questionnaire, na.rm = TRUE)
