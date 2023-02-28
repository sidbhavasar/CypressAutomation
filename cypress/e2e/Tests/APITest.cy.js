/// <reference types="cypress"/>


describe('APIMockTest', function(){

    it('APITest', function(){


        cy.intercept({
            url : 'https://www.rahulshettyacademy.com/api/course',
            method: 'GET'
            
        },
            {
                statusCode: 200,
                body: [{
                    "name": "Mock Response",
                    "author": "Test User",
                    "imgURL": "/assets/images/courses/javascript-sdet-automation-testing-package_1622746383_JS Sdet.png",
                    "courseURL": "https://courses.rahulshettyacademy.com/p/javascript-sdet-automation-testing",
                    "old_price": 7700,
                    "old_price_in_dollar": 99,
                    "actual_price": 2999,
                    "actual_price_in_dollar": 49,
                    "noOfCourses": 4,
                    "userEnrolled": 300,
                    "userComments": 1,
                    "rate": 1,
                    "isBundle": true
                  }]
            }).as('mocktest')

        //Launch the url
        cy.visit('https://www.rahulshettyacademy.com/api/course')
        cy.wait('@mocktest')

    })
})