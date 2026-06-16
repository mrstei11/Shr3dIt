library(shiny)
library(shinydashboard)
library(dplyr)
library(stringr)
library(shinyWidgets) 
library(fmsb)         
library(shinyjs)      
library(httr)         
library(jsonlite)
library(DT)
library(RSQLite)

# Set via environment variable — do not commit keys
GEMINI_API_KEY <- Sys.getenv("GEMINI_API_KEY", "")

# ... original Shiny prototype preserved for reference.
# Run with: GEMINI_API_KEY=your_key Rscript -e "shiny::runApp('shiny-reference')"
