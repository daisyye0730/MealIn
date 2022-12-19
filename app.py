import os
import openai
import ipywidgets as widgets
import textwrap as tw 
import re
from flask import Flask, render_template, request, jsonify

# Initialize Flask app
app = Flask(__name__)

# Constants
openai.api_key = "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"
option_result = []
description = ''
meal = ''
nutrition = ''
diet_purpose = ''
diet_restrictions = ''
personalizeResult = ''
ingredients = ''
switched = ''
substitute = ''

@app.route('/', methods = ['GET'])
def homepage(): 
    return render_template('homepage.html')

@app.route('/generateTenOptions', methods = ['GET', 'POST'])
def generateTenOptions(): 
    return render_template('generateTenOptions.html')

@app.route('/generateTenOptionsResult', methods=['GET', 'POST'])
def generateTenOptionsResult():
    global option_result
    global diet_purpose
    global diet_restrictions
    if request.method == "POST": 
        response = request.get_json()
        purpose = response["diet_purpose"]
        diet_purpose = purpose
        li_diet = response["diet_descript_li"]
        diet_str = ""
        for diet in li_diet: 
            diet_str = diet_str + diet + ", "
        diet_str = diet_str[:len(diet_str)-2]
        diet_restrictions = diet_str
        prompt = f"List the top 10 homecook meals for a {diet_restrictions} individual if that person wants to {diet_purpose}"
        completion = openai.Completion.create(engine="text-davinci-002", max_tokens=256, prompt=prompt)
        results = re.split('\n', completion.choices[0].text.strip())
        option_result=results
    return render_template('optionsResult.html', item=option_result)

@app.route('/regenerateTenOptionsResult', methods=['GET', 'POST'])
def regenerateTenOptionsResult():
    global option_result
    if request.method == "GET":
        prompt = f"List the top 10 homecook meals for a {diet_restrictions} individual if that person wants to {diet_purpose}"
        completion = openai.Completion.create(engine="text-davinci-002", max_tokens=256, prompt=prompt)
        results = re.split('\n', completion.choices[0].text.strip())
        option_result = results 
    return render_template('optionsResult.html', item=option_result)

@app.route('/showDescription', methods=['GET', 'POST'])
def showDescription(): 
    global description
    global meal
    if request.method == "POST": 
        response = request.get_json()
        meal = response['meal']
        prompt = f"Give me a description of {meal}"
        completion = openai.Completion.create(engine="text-davinci-002", max_tokens=256, prompt=prompt)
        result = completion.choices[0].text.strip()
        description = result
    return render_template("showDescription.html", item = [meal, description])

@app.route('/showNutrition', methods=['GET', 'POST'])
def showNutrition(): 
    global nutrition
    global meal
    if request.method == "POST": 
        response = request.get_json()
        mealName = response["meal"]
        meal = mealName
        prompt = f"Give me an overview of the nutrition value of {meal}"
        completion = openai.Completion.create(engine="text-davinci-002", max_tokens=256, prompt=prompt)
        result = completion.choices[0].text.strip()
        nutrition = result
    return render_template("showNutrition.html", item = [meal, nutrition])

@app.route('/personalizeRecipe', methods=['GET', 'POST'])
def personalizeRecipe():
    global meal
    global description
    if request.method == "POST":
        response = request.get_json()
        meal = response["meal"] 
        prompt = f"Give me the key ingredients of {meal}"
        completion = openai.Completion.create(engine="text-davinci-002", max_tokens=256, prompt=prompt)
        description = completion.choices[0].text.strip()
    return render_template("personalizeRecipe.html", item = [meal, description])

@app.route('/personalizeResult', methods=["GET", "POST"]) 
def personalizeResult(): 
    global personalizeResult
    global meal
    global switched
    global substitute
    if request.method == "POST": 
        response = request.get_json()
        meal = response["meal"]
        switched = response["switched_ingredient"]
        substitute = response["substitute"]
        prompt = f"For the meal {meal}, switch out {switched} and substitute it with {substitute}. Provide the recipe."
        completion = openai.Completion.create(engine="text-davinci-002", max_tokens=256, prompt=prompt)
        personalizeResult = re.split('\n', completion.choices[0].text.strip())
    return render_template("personalizeResult.html", item = [meal, personalizeResult])

@app.route('/generateGroceryList', methods=['GET', 'POST'])
def generateGroceryList(): 
    global ingredients
    if request.method == 'POST': 
        prompt = f"List the necessary groceries for {meal} given that {switched} is substituted with {substitute}. Use comma to separate each ingredient."
        completion = openai.Completion.create(engine="text-davinci-002", max_tokens=256, prompt=prompt)
        ingredients = re.split(',', completion.choices[0].text.strip())
    return render_template("generateGroceryList.html", item=ingredients)

port = int(os.environ.get('PORT', 8080))
if __name__ == '__main__':
    app.run(threaded=True, host='0.0.0.0', port=port)