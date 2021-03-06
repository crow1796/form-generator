(function(window, document, $, angular) {
	angular.module('app', ['form-generator'])
  var TestController;
  TestController = (function() {
    function TestController() {
      this.processForm = bind(this.processForm, this);
      this.templateModel = {};
      this.template = [
                [
                    // '%If Sole Owner, input owner\'s details first|[class:legend]',
                    // 'First Name|first_name|number:1:5:2016|[class:form-control]|[class:form-group]',
                    // 'Surname|surname|text|[class:form-control]|[class:form-group]',
                    // 'Nickname|nickname|text:currency|[class:form-control]|[class:form-group]',
                    // 'Phone Number|phone_number|text:tel|[class:form-control]|[class:form-group]',
                    // 'Email|email|text|[class:form-control]|[class:form-group]|[email:true]',
                    // 'Relationship to the Listing|listing_relationship|select|[class:form-control]|[class:form-group]',
                    // 'ID Information|id_information|radio&other|[class:form-radio-other]|[class:form-group]',
                    'Contacts|listing_contacts|repeater:1:4|[class:form-control]|[class:form-group listing-contacts-container]|[required:1@children[first_name:required:1@surname:required:1]]',
                    'Are there Transfer Fees?|transfer_fees|radio|[class:form-radio]|[class:form-group]',
                    'Car Parking|car_parking|checkbox|[class:form-checkbox]|[class:form-group]',
                    'Agreed Commission|agreed_commission|radio&other|[class:form-radio-other]|[class:form-group]',
                    'How many floors?|floors_count|number|[class:form-control]|[class:form-group]',
                    'Are there any Kick-Backs?|kick_backs|radio&other|[class:form-radio-other]|[class:form-group]',
                ],
                [
                    'Listing Date|listing_date|repeater:1:1|[class:form-control jq-datepick]|[class:form-group]|[required:1@children[first_name:required:true]]',
                    'Business / Listing Name|listing_name|text|[class:form-control]|[class:form-group]|[required:true@min:2]',
                    'Main Business Category|main_business_category|select|[class:form-control]|[class:form-group]',
                    'Main Business Type|main_business_type|select|[class:form-control]|[class:form-group]',
                    'Secondary Business Category|secondary_business_category|checkbox|[class:form-checkbox]|[class:form-group half-col]',
                    'Secondary Business Type|secondary_business_type|checkbox|[class:form-checkbox]|[class:form-group half-col]',
                    'Listing Type|listing_type|radio|[class:form-radio]|[class:form-group clear]',
                    'Currently Operational?|currently_operational|radio&other|[class:form-radio-other]|[class:form-group]|[required:true]',
                    'Address Line 1|address_line1|text|[class:form-control]|[class:form-group]',
                    'Address Line 2|address_line2|text|[class:form-control]|[class:form-group]',
                    'Country|country|select|[class:form-control]|[class:form-group clear-both]',
                    'Province|province|select|[class:form-control]|[class:form-group clear-both]',
                    'District|district|select|[class:form-control]|[class:form-group]',
                    '%Listing Number: |[class:legend listing-number]|listing_number',
                    'City / Suburb|city_suburb|text|[class:form-control]|[class:form-group]',
                    'Post Code|post_code|text|[class:form-control]|[class:form-group]',
                    'Nearest Main Road|nearest_main_road|text|[class:form-control]|[class:form-group]',
                    'Tenure Options|tenure_options|radio|[class:form-radio]|[class:form-group]',
                    'Building Type|building_type|radio|[class:form-radio]|[class:form-group]',
                    'What is the First Level that Business in Conducted?|first_level_business_conduct|radio&other|[class:form-radio-other]|[class:form-group]',
                    'Approx. Area of each level/floor (m2)|approx_area|repeater[class:form-control]|[class:form-group]',
                    'Stock|stock|radio&other|[class:form-radio-other]|[class:form-group]',
                    'Transition|transition|radio&other|[class:form-radio-other]|[class:form-group]',
                    'Reason for Selling|selling_reason|radio|[class:form-radio]|[class:form-group]',
                    'Inspection Times?|inspection_times|radio&other|[class:form-radio-other]|[class:form-group]',
                    'Inspection Meeting Place?|inspection_place|text|[class:form-control]|[class:form-group]',
                    'Meeting Times|meeting_times|radio&other|[class:form-radio-other]|[class:form-group]',
                    'Meeting Place for Meetings?|meeting_place|radio&other|[class:form-radio-other]|[class:form-group]',
                    'Listing Participation|listing_participation|radio&other|[class:form-radio-other]|[class:form-group]',
                    'Asking Price|asking_price|text|[class:form-control]|[class:form-group]',
                    'Vendor Finance|vendor_finance|radio&other|[class:form-radio-other]|[class:form-group]',
                    'Company Included?|company_included|radio&other|[class:form-radio-other]|[class:form-group]'
                ],
                [
                    '%Land Details|[class:legend]',
                    'Size|size|text|[class:form-control]|[class:form-group]',
                    'Connected Utilities|connected_utilities|checkbox|[class:form-checkbox]|[class:form-group]',
                    'Land Improvements|land_improvement|checkbox|[class:form-checkbox]|[class:form-group]',
                    'Natural Features|natural_features|checkbox|[class:form-checkbox]|[class:form-group]',
                    'Current Development Approvals|current_development_approvals|textarea|[class:form-control]|[class:form-group]',
                    'Rentals Encumbrances|rentals_encumbrances|radio&other|[class:form-radio-other]|[class:form-group]',
                    'Other Encumbrances|other_encumbrances|textarea|[class:form-control]|[class:form-group]',
                    '%Hotels/ Guests Houses|[class:legend]',
                    'Sleeping Capacity|sleeping_capacity|number|[class:form-control]|[class:form-group]',
                    'Number of Guest Rooms|guest_room_numbers|number|[class:form-control]|[class:form-group]',
                    'About the Rooms|about_rooms|repeater|[class:form-control]|[class:form-group]',
                    '%Features|[class:legend]',
                    'Features|features|checkbox|[class:form-checkbox]|[class:form-group]',
                    'Current Licenses that are included in the Sale Offer|current_licenses|checkbox|[class:form-checkbox]|[class:form-group]',
                    'Currently Staffed?|currently_staffed|radio&other|[class:form-radio-other]|[class:form-group]',
                    'Average Monthly Revenue (Low Season)|average_revenue_low_season|text|[class:form-control]|[class:form-group]',
                    'Average Revenue (High Season)|average_revenue_high_season|text|[class:form-control]|[class:form-group]',
                    'Average Monthly Revenue (Both Season)|average_revenue_both_season|text|[class:form-control]|[class:form-group]',
                    'Average Net Profit (Low Season)|average_net_low_season|text|[class:form-control]|[class:form-group]',
                    'Average Net Profit (High Season)|average_net_high_season|text|[class:form-control]|[class:form-group]',
                    'Average Net Profit (Both Seasons)|average_net_both_season|text|[class:form-control]|[class:form-group]',
                    'Can Financials be Shown to Potential Buyers?|financials_shown|checkbox|[class:form-checkbox]|[class:form-group]',
                    'Average Monthly Electricity Bill|average_electric_bill|text|[class:form-control]|[class:form-group]',
                    'Average Monthly Water Bill|average_water_bill|text|[class:form-control]|[class:form-group]',
                    'Police|police|text|[class:form-control]|[class:form-group]',
                    '%TV Connection|[class:legend]',
                    'Number of Screens|tv_screens_number|number|[class:form-control]|[class:form-group]',
                    'Cost Per Month|tv_cost_per_month|text|[class:form-control]|[class:form-group]',
                    '%Internet Connection|[class:legend]',
                    'Wifi Enabled?|wifi_enabled|radio|[class:form-radio]|[class:form-group]',
                    'Cost Per Month|wifi_cost_per_month|text|[class:form-control]|[class:form-group]',
                    '%Online Assets INCLUDED in Sale and Online Reviews|[class:legend]',
                    'General|online_assets_included|checkbox|[class:form-checkbox]|[class:form-group]',
                    'Online Booking Agencies|online_booking_agencies|checkbox|[class:form-checkbox]|[class:form-group]',
                    'Trip Advisor Rating|trip_advisor_rating|radio|[class:form-radio]|[class:form-group]'
                ],
                [
                    '%Supporting Documents & Terms and Conditions|[class:legend]',
                    'Can photos be used in Advertisements?|photo_advertisements|radio&other|[class:form-radio-other]|[class:form-group]',
                    'Do we have a copy of the Channote|channote_copy|radio&other|[class:form-radio-other]|[class:form-group]',
                    'Do we have the Assets List|assets_list|radio&other|[class:form-radio-other]|[class:form-group]',
                    'Do we have a Floor Plan|floor_plan|radio&other|[class:form-radio-other]|[class:form-group]',
                    'Do we have the Financials?|has_financials|radio&other|[class:form-radio-other]|[class:form-group]',
                    'Listing Terms and Conditions|listing_terms_conditions|checkbox|[class:form-checkbox]|[class:form-group]'
                ],
                [
                    'Advertisement / Post Heading|advertisement_post_heading|text|[class:form-control]|[class:form-group]|[required:true]',
                    'Agent\'s Comments|agents_comment|textarea|[class:form-control]|[class:form-group]',
                    'More Information|more_information|textarea|[class:form-control]|[class:form-group]',
                    'Featured Image|featured_image|file&preview|[class:form-control]|[class:form-group]|[required:true@dimension:848,440]',
                    'Gallery Images|galley_images|files&preview|[class:form-control]|[class:form-group]|[dimension:848,440]'
                ]
            ];

      this.templateValues = {
        'listing_date_day': [
          {
            'value': 1,
            'label': 1
          }
        ],
        'listing_date_month': [
          {
            'value': 'January',
            'label': 'January'
          }
        ],
        'listing_date_year': [
          {
            'value': 2016,
            'label': 2016
          }
        ],
        'listing_date': [
          {
            'model': 'listing_date_day',
            'type': 'select',
            'label': 'Day',
            'attributes': {
              'class': 'form-control'
            },
            'container_attributes': {
              'class': 'form-group'
            }
          },
          {
            'model': 'listing_date_month',
            'type': 'select',
            'label': 'Month',
            'attributes': {
              'class': 'form-control'
            },
            'container_attributes': {
              'class': 'form-group'
            }
          },
          {
            'model': 'listing_date_year',
            'type': 'select',
            'label': 'Year',
            'attributes': {
              'class': 'form-control'
            },
            'container_attributes': {
              'class': 'form-group'
            }
          }
        ],
          'listing_contacts': [
              {
                  'label': 'First Name',
                  'model': 'first_name',
                  'type': 'number',
                  'attributes': {
                      'class': 'form-control'
                  },
                  'container_attributes': {
                      'class': 'form-group'
                  },
                  'min_value': 0
              },
              {
                  'label': 'Surname',
                  'model': 'surname',
                  'type': 'text',
                  'attributes': {
                      'class': 'form-control'
                  },
                  'container_attributes': {
                      'class': 'form-group'
                  }
              },
              {
                  'label': 'Nickname',
                  'model': 'nickname',
                  'type': 'text',
                  'attributes': {
                      'class': 'form-control'
                  },
                  'container_attributes': {
                      'class': 'form-group'
                  }
              },
              {
                  'label': 'Mobile Number',
                  'model': 'mobile_number',
                  'type': 'text',
                  'attributes': {
                      'class': 'form-control'
                  },
                  'container_attributes': {
                      'class': 'form-group'
                  }
              },
              {
                  'label': 'Email',
                  'model': 'email',
                  'type': 'text',
                  'attributes': {
                      'class': 'form-control'
                  },
                  'container_attributes': {
                      'class': 'form-group'
                  }
              },
              {
                  'label': 'Relationship to the listing',
                  'model': 'listing_relationship',
                  'type': 'select',
                  'attributes': {
                      'class': 'form-control'
                  },
                  'container_attributes': {
                      'class': 'form-group'
                  }
              },
              {
                  'label': 'ID Information',
                  'model': 'id_information',
                  'type': 'radio&other',
                  'attributes': {
                      'class': 'form-radio'
                  },
                  'container_attributes': {
                      'class': 'form-group'
                  }
              }
          ],
          'listing_relationship':[
              {
                  'value': 'Owner',
                  'label': 'Owner'
              },
              {
                  'value': 'Partner',
                  'label': 'Partner'
              },
              {
                  'value': 'Company Director',
                  'label': 'Company Director'
              },
              {
                  'value': 'Owner’s Authorized Representative',
                  'label': 'Owner’s Authorized Representative'
              },
              {
                  'value': 'Agent / Broker',
                  'label': 'Agent / Broker'
              }
          ],
          'id_information': [
              {
                  'value': 'Thai National ID Card',
                  'label': 'Thai National ID Card',
                  'with': [
                    {
                      'label': 'Thai National ID Card',
                      'model': 'thai_national_id_card',
                      'type': 'text',
                      'attributes': {
                          'class': 'form-radio'
                      },
                      'container_attributes': {
                          'class': 'form-group'
                      },
                      'rules': {
                          'required': 'true'
                      }
                  }
                ]
              },
              {
                  'value': 'Passport',
                  'label': 'Passport'
              }
          ],
          'currently_opt_first_traded': [
              {
                'value': 2016,
                'label': 2016
              }
          ],
          'currently_opt_what_month': [
            {
              'value': 'January',
              'label': 'January'
            }
          ],
          'listing_type': [
              {
                  'value': 'Property Sale (Freehold Premises)',
                  'label': 'Property Sale (Freehold Premises)'
              },
              {
                  'value': 'Property Sale (Strata/Condo Title)',
                  'label': 'Property Sale (Strata/Condo Title)'
              },
              {
                  'value': 'Business Sale and Rent (Leasehold Premises)',
                  'label': 'Business Sale and Rent (Leasehold Premises)'
              },
              {
                  'value': 'Business Sale and Rent (Sub-Leasehold Premises)',
                  'label': 'Business Sale and Rent (Sub-Leasehold Premises)'
              },
              {
                  'value': 'Property Rental (Leasehold Premises)',
                  'label': 'Property Rental (Leasehold Premises)'
              },
              {
                  'value': 'Property Rental (Sub-Leasehold Premises)',
                  'label': 'Property Rental (Sub-Leasehold Premises)'
              },
              {
                  'value': 'Assets/IP Sale (No Premises)',
                  'label': 'Assets/IP Sale (No Premises)'
              },
              {
                  'value': 'Land Sale (Freehold)',
                  'label': 'Land Sale (Freehold)'
              },
              {
                  'value': 'Land Rental (Lease)',
                  'label': 'Land Rental (Lease)'
              },
              {
                  'value': 'Investment',
                  'label': 'Investment'
              },
              {
                  'value': 'Partnership  (Transfer of Shares)',
                  'label': 'Partnership  (Transfer of Shares)'
              },
              {
                  'value': 'Partnership (Consortium Contract)',
                  'label': 'Partnership (Consortium Contract)'
              }
          ],
          'currently_operational': [
              {
                  'value': 'Yes',
                  'label': 'Yes',
                  'with': [
                      {
                        'label': 'First Traded',
                        'model': 'currently_opt_first_traded',
                        'type': 'number',
                        'attributes': {
                            'class': 'form-radio'
                        },
                        'container_attributes': {
                            'class': 'form-group'
                        },
                        'min_value': 0,
                        'max_digits': 4,
                        'max_value': 2016
                    },{
                        'label': 'What Month?',
                        'model': 'currently_opt_what_month',
                        'type': 'select',
                        'attributes': {
                            'class': 'form-radio'
                        },
                        'container_attributes': {
                            'class': 'form-group'
                        }
                    }
                  ]
              },
              {
                  'value': 'No',
                  'label': 'No'
              },
              {
                  'value': 'No - Never Opened/Traded',
                  'label': 'No - Never Opened/Traded'
              },
              {
                  'value': 'No - Unfinished Project',
                  'label': 'No - Unfinished Project'
              }
          ],
          'tenure_options': [
              {
                  'value': 'This listing is also available for Freehold Sale - please ask for details',
                  'label': 'This listing is also available for Freehold Sale - please ask for details'
              },
              {
                  'value': 'This listing is also available for Leasehold Sale (Sale and Rent) - please ask for details',
                  'label': 'This listing is also available for Leasehold Sale (Sale and Rent) - please ask for details'
              },
              {
                  'value': 'This listing is also available as a 50% Share, please ask for details',
                  'label': 'This listing is also available as a 50% Share, please ask for details'
              },
              {
                  'value': 'This listing is also available for outright Sale (100%), please ask for detailals',
                  'label': 'This listing is also available for outright Sale (100%), please ask for detailals'
              },
              {
                  'value': 'A longer Lease Period may be negotiated if required',
                  'label': 'A longer Lease Period may be negotiated if required'
              }
          ],
          'transfer_fees_responsible': [
              {
                  'value': 'Buyer',
                  'label': 'Buyer'
              },
              {
                  'value': 'Seller',
                  'label': 'Seller'
              },
              {
                  'value': 'Buyer and Seller (Divided Equally)',
                  'label': 'Buyer and Seller (Divided Equally)'
              }
          ],
          'transfer_fees': [
              {
                  'value': 'Yes',
                  'label': 'Yes',
                  'with': [
                      {
                          'label': 'Responsibility for Payment of Transfer Fees',
                          'model': 'transfer_fees_responsible',
                          'type': 'radio&other',
                          'attributes': {
                                  'class': 'form-radio-other'
                          },
                          'container_attributes': {
                                  'class': 'form-group'
                           }
                      }
                  ]
              },
              {
                  'value': 'No',
                  'label': 'No'
              }
          ],
          'building_type': [
              {
                  'value': 'Single Shop House',
                  'label': 'Single Shop House'
              },
              {
                  'value': 'Double Shop House',
                  'label': 'Double Shop House'
              },
              {
                  'value': 'Triple Shop House',
                  'label': 'Triple Shop House'
              },
              {
                  'value': 'Quadruple Shop-House',
                  'label': 'Quadruple Shop-House'
              },
              {
                  'value': 'Retail Shop',
                  'label': 'Retail Shop'
              },
              {
                  'value': 'Retail Space in Hotel',
                  'label': 'Retail Space in Hotel'
              },
              {
                  'value': 'Retail Space in Shopping Mall',
                  'label': 'Retail Space in Shopping Mall'
              },
              {
                  'value': 'Stand Alone Building',
                  'label': 'Stand Alone Building'
              },
              {
                  'value': 'Kiosk',
                  'label': 'Kiosk'
              },
              {
                  'value': 'Open Front Retail Space in Plaza',
                  'label': 'Open Front Retail Space in Plaza'
              },
              {
                  'value': 'Closed Front Retail Space in Plaza',
                  'label': 'Closed Front Retail Space in Plaza'
              },
              {
                  'value': 'Shed',
                  'label': 'Shed'
              },
              {
                  'value': 'Warehouse',
                  'label': 'Warehouse'
              },
              {
                  'value': 'Factory',
                  'label': 'Factory'
              },
              {
                  'value': 'Traditional Building/House',
                  'label': 'Traditional Building/House'
              },
              {
                  'value': 'Boat/Ship/Submarine',
                  'label': 'Boat/Ship/Submarine'
              },
              {
                  'value': 'Multiple Buildings',
                  'label': 'Multiple Buildings'
              },
              {
                  'value': 'Street/Market Stall',
                  'label': 'Street/Market Stall'
              },
              {
                  'value': 'Multi-Story Apartment/Hotel Building',
                  'label': 'Multi-Story Apartment/Hotel Building'
              },
              {
                  'value': 'House or Villa',
                  'label': 'House or Villa'
              },
              {
                  'value': 'Housing Complex/Development',
                  'label': 'Housing Complex/Development'
              },
              {
                  'value': 'Housing Complex/Development',
                  'label': 'Housing Complex/Development'
              }
          ],
          'first_level_business_conduct': [
              {
                  'value': 'Ground Level',
                  'label': 'Ground Level'
              },
              {
                  'value': '2nd Level (one level above ground)',
                  'label': '2nd Level (one level above ground)'
              },
              {
                  'value': 'Basement (one level below ground)',
                  'label': 'Basement (one level below ground)'
              }
          ],
          'approx_area': [
              {
                  'type': 'number',
                  'model': 'level',
                  'label': 'Level',
                  'attributes': {
                      'class': 'form-control'
                  },
                  'container_attributes': {
                      'class': 'form-group'
                  },
                  'min_value': 0
              },
              {
                  'type': 'text',
                  'model': 'area',
                  'label': 'Area',
                  'attributes': {
                      'class': 'form-control'
                  },
                  'container_attributes': {
                      'class': 'form-group'
                  }
              }
          ],
          'car_parking': [
              {
                  'value': 'Private Car Parking',
                  'label': 'Private Car Parking',
                  'with': [
                      {
                        'label': 'Car Park Spaces',
                        'model': 'car_park_spaces',
                        'type': 'text',
                        'attributes': {
                          'class': 'form-control'
                        },
                        'container_attributes': {
                          'class': 'form-group'
                        }
                      }
                  ]
              },
              {
                  'value': 'Private Motor Bike Parking',
                  'label': 'Private Motor Bike Parking',
                  'with': [
                      {
                        'label': 'Motor Bike Park Spaces',
                        'model': 'motor_bike_park_spaces',
                        'type': 'text',
                        'attributes': {
                          'class': 'form-control'
                        },
                        'container_attributes': {
                          'class': 'form-group'
                        }
                      }
                  ]
              },
              {
                  'value': 'Parking available in the nearby streets',
                  'label': 'Parking available in the nearby streets'
              },
              {
                  'value': 'Parking available in nearby commercial car-park',
                  'label': 'Parking available in nearby commercial car-park'
              },
              {
                  'value': 'Parking available in nearby Hotel',
                  'label': 'Parking available in nearby Hotel'
              },
              {
                  'value': 'Parking available in Nearby Temple',
                  'label': 'Parking available in Nearby Temple'
              },
              {
                  'value': 'Use of mall car park is permitted',
                  'label': 'Use of mall car park is permitted'
              },
              {
                  'value': 'Valet Parking',
                  'label': 'Valet Parking'
              },
              {
                  'value': 'Not Applicable',
                  'label': 'Not Applicable'
              }
          ],
          'stock': [
              {
                  'value': 'Stock at the time of settlement is Included in the asking price',
                  'label': 'Stock at the time of settlement is Included in the asking price'
              },
              {
                  'value': 'Stock at the time of settlement is not Included in the asking price',
                  'label': 'Stock at the time of settlement is not Included in the asking price'
              },
              {
                  'value': 'Stock may be valued at Cost Price at the time of settlement and transferred to the new owner at Cost Price, if required',
                  'label': 'Stock may be valued at Cost Price at the time of settlement and transferred to the new owner at Cost Price, if required'
              },
              {
                  'value': 'Not Applicable',
                  'label': 'Not Applicable'
              }
          ],
          'transition': [
              {
                  'value': 'The owner or the owner\'s representative will assist in transitioning the business for a short period after settlement, if required',
                  'label': 'The owner or the owner\'s representative will assist in transitioning the business for a short period after settlement, if required'
              },
              {
                  'value': 'The owner does not offer any transition assistance',
                  'label': 'The owner does not offer any transition assistance'
              },
              {
                  'value': 'Full Training will be Provided',
                  'label': 'Full Training will be Provided'
              },
              {
                  'value': 'Not Applicable',
                  'label': 'Not Applicable'
              }
          ],
          'selling_reason': [
              {
                  'value': 'Ill health',
                  'label': 'Ill health'
              },
              {
                  'value': 'Retirement',
                  'label': 'Retirement'
              },
              {
                  'value': 'Moving abroad',
                  'label': 'Moving abroad'
              },
              {
                  'value': 'Relocation',
                  'label': 'Relocation'
              },
              {
                  'value': 'Relationship Change',
                  'label': 'Relationship Change'
              },
              {
                  'value': 'Other Business Ventures',
                  'label': 'Other Business Ventures'
              },
              {
                  'value': 'Personal',
                  'label': 'Personal'
              },
              {
                  'value': 'Want Partner/Investor',
                  'label': 'Want Partner/Investor'
              },
              {
                  'value': 'Expanding Business',
                  'label': 'Expanding Business'
              }
          ],
          'inspection_times': [
              {
                  'value': 'Monday to Friday between 1000 and 1700, and Saturday between 1000 and 1300',
                  'label': 'Monday to Friday between 1000 and 1700, and Saturday between 1000 and 1300'
              },
              {
                  'value': 'Monday to Friday between 1000 and 1700',
                  'label': 'Monday to Friday between 1000 and 1700'
              },
              {
                  'value': 'Monday to Saturday between 1900 and 2100',
                  'label': 'Monday to Saturday between 1900 and 2100'
              }
          ],
          'meeting_times': [
              {
                  'value': 'Monday to Friday between 1000 and 1700, and Saturday between 1000 and 1300',
                  'label': 'Monday to Friday between 1000 and 1700, and Saturday between 1000 and 1300'
              },
              {
                  'value': 'Monday to Friday between 1000 and 1700',
                  'label': 'Monday to Friday between 1000 and 1700'
              }
          ],
          'meeting_place': [
              {
                  'value': 'Office - ABB Bangkok',
                  'label': 'Office - ABB Bangkok'
              },
              {
                  'value': 'Office - ABB Phuket',
                  'label': 'Office - ABB Phuket'
              },
              {
                  'value': 'Office - ABB Pattaya',
                  'label': 'Office - ABB Pattaya'
              }
          ],
          'listing_participation': [
              {
                  'value': 'No Agent/Broker inquiries please',
                  'label': 'No Agent/Broker inquiries please'
              },
              {
                  'value': 'Agent/Broker inquiries with qualified buyers are welcome',
                  'label': 'Agent/Broker inquiries with qualified buyers are welcome'
              }
          ],
          'agreed_commission': [
              {
                  'value': 'Fixed Rate',
                  'label': 'Fixed Rate',
                  'with': [
                      {
                        'label': 'How much is the Agreed Fixed Rate of Commission?',
                        'model': 'fixed_rate',
                        'type': 'text',
                        'attributes': {
                          'class': 'form-control'
                        },
                        'container_attributes': {
                          'class': 'form-group'
                        }
                      }
                  ]
              },
              {
                  'value': 'Percentage',
                  'label': 'Percentage',
                  'with': [
                      {
                        'label': 'What is the Commission Percentage?',
                        'model': 'precentage_rate',
                        'type': 'text',
                        'attributes': {
                          'class': 'form-control'
                        },
                        'container_attributes': {
                          'class': 'form-group'
                        }
                      }
                  ]
              }
          ],
          'kick_backs': [
              {
                  'value': 'Yes',
                  'label': 'Yes',
                  'with': [
                      {
                        'label': 'How much is the Kick Backs?',
                        'model': 'kick_back_how_much',
                        'type': 'text',
                        'attributes': {
                          'class': 'form-control'
                        },
                        'container_attributes': {
                          'class': 'form-group'
                        }
                      },
                      {
                        'label': 'Who is the Kick Back paid to?',
                        'model': 'kick_back_who',
                        'type': 'text',
                        'attributes': {
                          'class': 'form-control'
                        },
                        'container_attributes': {
                          'class': 'form-group'
                        }
                      }
                  ]
              },
              {
                  'value': 'No',
                  'label': 'No'
              }
          ],
          'vendor_finance': [
              {
                  'value': 'Yes, please ask for details',
                  'label': 'Yes, please ask for details'
              },
              {
                  'value': 'No',
                  'label': 'No'
              },
              {
                  'value': 'No, however Progress Payments are expected',
                  'label': 'No, however Progress Payments are expected'
              }
          ],
          'capitalization': [
            {
              'value': 'one',
              'label': 'one'
            },
            {
              'value': 'two',
              'label': 'two'
            },
            {
              'value': 'three',
              'label': 'three'
            }
          ],
          'company_included': [
              {
                  'value': 'Yes',
                  'label': 'Yes',
                  'with': [
                    {
                      'label': 'Capitalization',
                      'model': 'capitalization',
                      'type': 'radio&other',
                      'attributes': [
                        {
                          'class': 'form-radio'
                        }
                      ],
                      'container_attributes': [
                        {
                          'class': 'form-group'
                        }
                      ]
                    }
                  ]
              },
              {
                  'value': 'No',
                  'label': 'No'
              },
              {
                  'value': 'In company name, but company not included',
                  'label': 'In company name, but company not included'
              }
          ],
          'about_rooms': [
              {
                  'type': 'text',
                  'model': 'description',
                  'label': 'Description',
                  'attributes': {
                      'class': 'form-control'
                  },
                  'container_attributes': {
                      'class': 'form-group'
                  }
              },
              {
                  'type': 'number',
                  'model': 'quantity',
                  'label': 'Quantity',
                  'attributes': {
                      'class': 'form-control'
                  },
                  'container_attributes': {
                      'class': 'form-group'
                  }
              },
              {
                  'type': 'text',
                  'model': 'room_type',
                  'label': 'Room Type',
                  'attributes': {
                      'class': 'form-control'
                  },
                  'container_attributes': {
                      'class': 'form-group'
                  }
              },
              {
                  'type': 'text',
                  'model': 'low_price',
                  'label': 'Low Price',
                  'attributes': {
                      'class': 'form-control'
                  },
                  'container_attributes': {
                      'class': 'form-group'
                  }
              },
              {
                  'type': 'text',
                  'model': 'high_price',
                  'label': 'High Price',
                  'attributes': {
                      'class': 'form-control'
                  },
                  'container_attributes': {
                      'class': 'form-group'
                  }
              }
          ],
          'connected_utilities': [
              {
                  'value': 'Power',
                  'label': 'Power'
              },
              {
                  'value': '3 Phase Power',
                  'label': '3 Phase Power'
              },
              {
                  'value': 'Water',
                  'label': 'Water'
              },
              {
                  'value': 'Internet',
                  'label': 'Internet'
              },
              {
                  'value': 'Satellite',
                  'label': 'Satellite'
              },
              {
                  'value': 'Other',
                  'label': 'Other'
              }
          ],
          'land_improvement': [
              {
                  'value': 'Livable Dwelling/s',
                  'label': 'Livable Dwelling/s'
              },
              {
                  'value': 'Unlivable Dwelling/s',
                  'label': 'Unlivable Dwelling/s'
              },
              {
                  'value': 'Garage/Carport/s',
                  'label': 'Garage/Carport/s'
              },
              {
                  'value': 'Unsealed Road/s',
                  'label': 'Unsealed Road/s'
              },
              {
                  'value': 'Sealed Road/s',
                  'label': 'Sealed Road/s'
              },
              {
                  'value': 'Foot Paths',
                  'label': 'Foot Paths'
              },
              {
                  'value': 'Landscaping',
                  'label': 'Landscaping'
              },
              {
                  'value': 'Fencing',
                  'label': 'Fencing'
              },
              {
                  'value': 'Drainage',
                  'label': 'Drainage'
              },
              {
                  'value': 'Irrigation',
                  'label': 'Irrigation'
              },
              {
                  'value': 'Water Well',
                  'label': 'Water Well'
              },
              {
                  'value': 'Agricultural Crops',
                  'label': 'Agricultural Crops'
              },
              {
                  'value': 'Commercial Trees',
                  'label': 'Commercial Trees'
              },
              {
                  'value': 'Other',
                  'label': 'Other'
              }
          ],
          'natural_features': [
              {
                  'value': 'Beach Frontage',
                  'label': 'Beach Frontage'
              },
              {
                  'value': 'Water Fall/s',
                  'label': 'Water Fall/s'
              },
              {
                  'value': 'Dam/s',
                  'label': 'Dam/s'
              },
              {
                  'value': 'Creek/s',
                  'label': 'Creek/s'
              },
              {
                  'value': 'River/s',
                  'label': 'River/s'
              },
              {
                  'value': 'Other',
                  'label': 'Other'
              }
          ],
          'features': [
              {
                  'value': 'Established Business/Clientele',
                  'label': 'Established Business/Clientele'
              },
              {
                  'value': 'Close to a Beach',
                  'label': 'Close to a Beach'
              },
              {
                  'value': 'Main Road Location',
                  'label': 'Main Road Location'
              },
              {
                  'value': 'Close to a Lake',
                  'label': 'Close to a Lake'
              },
              {
                  'value': 'Mountain Views',
                  'label': 'Mountain Views'
              },
              {
                  'value': 'Retail Shopping Nearby',
                  'label': 'Retail Shopping Nearby'
              },
              {
                  'value': 'Night-Time Entertainment Area',
                  'label': 'Night-Time Entertainment Area'
              },
              {
                  'value': 'High Foot Traffic',
                  'label': 'High Foot Traffic'
              },
              {
                  'value': 'Low ROI',
                  'label': 'Low ROI'
              },
              {
                  'value': 'Recently Refurbished',
                  'label': 'Recently Refurbished'
              },
              {
                  'value': 'Ideal for Husband and Wife',
                  'label': 'Ideal for Husband and Wife'
              },
              {
                  'value': 'Owner/Manager Accommodation',
                  'label': 'Owner/Manager Accommodation'
              },
              {
                  'value': 'Staff Accommodation',
                  'label': 'Staff Accommodation'
              },
              {
                  'value': 'Staff Common Room/Change Room',
                  'label': 'Staff Common Room/Change Room'
              },
              {
                  'value': 'Elevator',
                  'label': 'Elevator'
              },
              {
                  'value': 'Landscaped Garden/Grounds',
                  'label': 'Landscaped Garden/Grounds'
              },
              {
                  'value': 'Swimming Pool',
                  'label': 'Swimming Pool'
              },
              {
                  'value': 'Sauna',
                  'label': 'Sauna'
              },
              {
                  'value': 'Scandinavian Hot & Dry Sauna',
                  'label': 'Scandinavian Hot & Dry Sauna'
              },
              {
                  'value': 'Jacuzzi',
                  'label': 'Jacuzzi'
              },
              {
                  'value': 'Manager\'s Office',
                  'label': 'Manager\'s Office'
              },
              {
                  'value': 'Kitchen/Kitchenette',
                  'label': 'Kitchen/Kitchenette'
              },
              {
                  'value': 'Storage Room/s',
                  'label': 'Storage Room/s'
              },
              {
                  'value': 'CCTV',
                  'label': 'CCTV'
              },
              {
                  'value': 'Emergency Lighting',
                  'label': 'Emergency Lighting'
              },
              {
                  'value': 'Fire Extinguishers Throughout',
                  'label': 'Fire Extinguishers Throughout'
              },
              {
                  'value': 'Smoke Detectors/Alarm System',
                  'label': 'Smoke Detectors/Alarm System'
              },
              {
                  'value': 'Pool Table',
                  'label': 'Pool Table'
              },
              {
                  'value': 'Multiple Pool Tables',
                  'label': 'Multiple Pool Tables'
              },
              {
                  'value': 'Darts Board',
                  'label': 'Darts Board'
              },
              {
                  'value': 'Multiple Darts Boards',
                  'label': 'Multiple Darts Boards'
              },
              {
                  'value': 'Children\'s Play Area',
                  'label': 'Children\'s Play Area'
              }
          ],
          'rentals_encumbrances': [
              {
                  'value': '100% of the property is leased or sub-leased',
                  'label': '100% of the property is leased or sub-leased'
              },
              {
                  'value': 'Some of the property is leased or sub-leased',
                  'label': 'Some of the property is leased or sub-leased'
              }
          ],
          'current_licenses': [
              {
                  'value': 'Food',
                  'label': 'Food'
              },
              {
                  'value': 'Alcohol',
                  'label': 'Alcohol'
              },
              {
                  'value': 'Tobacco',
                  'label': 'Tobacco'
              },
              {
                  'value': 'Entertainment',
                  'label': 'Entertainment'
              },
              {
                  'value': 'Hotel',
                  'label': 'Hotel'
              },
              {
                  'value': 'Apartment',
                  'label': 'Apartment'
              },
              {
                  'value': 'Rooms for Rent',
                  'label': 'Rooms for Rent'
              },
              {
                  'value': 'Import/Export',
                  'label': 'Import/Export'
              },
              {
                  'value': 'Music',
                  'label': 'Music'
              },
              {
                  'value': 'Massage',
                  'label': 'Massage'
              },
              {
                  'value': 'Ministry of Public Health Thai Traditional Clinic Certificate',
                  'label': 'Ministry of Public Health Thai Traditional Clinic Certificate'
              },
              {
                  'value': 'Tour Operation',
                  'label': 'Tour Operation'
              },
              {
                  'value': 'Tourism Authority Thailand (TAT)',
                  'label': 'Tourism Authority Thailand (TAT)'
              },
              {
                  'value': 'Association of Thai Travel Agents (ATTA)',
                  'label': 'Association of Thai Travel Agents (ATTA)'
              },
              {
                  'value': 'International Air Transport Association (IATA)',
                  'label': 'International Air Transport Association (IATA)'
              },
              {
                  'value': 'Ministry of Education (MoE) Certification',
                  'label': 'Ministry of Education (MoE) Certification'
              },
              {
                  'value': 'No Licenses',
                  'label': 'No Licenses'
              },
              {
                  'value': 'Other',
                  'label': 'Other'
              }
          ],
          'currently_staffed': [
              {
                  'value': 'Yes',
                  'label': 'Yes'
              },
              {
                  'value': 'No',
                  'label': 'No'
              },
              {
                  'value': 'Not Applicable',
                  'label': 'Not Applicable'
              }
          ],
          'wifi_enabled': [
              {
                  'value': 'Yes',
                  'label': 'Yes'
              },
              {
                  'value': 'No',
                  'label': 'No'
              }
          ],
          'online_assets_included': [
              {
                  'value': 'Web Site',
                  'label': 'Web Site'
              },
              {
                  'value': 'Face Book Page',
                  'label': 'Face Book Page'
              },
              {
                  'value': 'Twitter Account',
                  'label': 'Twitter Account'
              },
              {
                  'value': 'Google PLUS Account',
                  'label': 'Google PLUS Account'
              },
              {
                  'value': 'Instagram Account',
                  'label': 'Instagram Account'
              },
              {
                  'value': 'YouTube Channel',
                  'label': 'YouTube Channel'
              },
              {
                  'value': 'LinkedIn Business Page',
                  'label': 'LinkedIn Business Page'
              },
              {
                  'value': 'Other',
                  'label': 'Other'
              }
          ],
          'online_booking_agencies': [
              {
                  'value': 'agoda',
                  'label': 'agoda'
              },
              {
                  'value': 'booking',
                  'label': 'booking'
              },
              {
                  'value': 'wotif',
                  'label': 'wotif'
              },
              {
                  'value': 'expedia',
                  'label': 'expedia'
              },
              {
                  'value': 'hostelworld',
                  'label': 'hostelworld'
              },
              {
                  'value': 'hostelbookers',
                  'label': 'hostelbookers'
              },
              {
                  'value': 'airbnb',
                  'label': 'airbnb'
              },
              {
                  'value': 'other/s',
                  'label': 'other/s'
              }
          ],
          'trip_advisor_rating': [
              {
                  'value': 'Top 5%',
                  'label': 'Top 5%'
              },
              {
                  'value': 'Top 10%',
                  'label': 'Top 10%'
              },
              {
                  'value': 'Top 20%',
                  'label': 'Top 20%'
              },
              {
                  'value': 'Top 50%',
                  'label': 'Top 50%'
              },
              {
                  'value': 'Rated on Trip Advisor',
                  'label': 'Rated on Trip Advisor'
              },
              {
                  'value': 'Not Rated',
                  'label': 'Not Rated'
              }
          ],
          'photo_advertisements': [
              {
                  'value': 'Yes',
                  'label': 'Yes'
              },
              {
                  'value': 'No',
                  'label': 'No'
              }
          ],
          'channote_copy': [
              {
                  'value': 'Yes',
                  'label': 'Yes'
              },
              {
                  'value': 'No',
                  'label': 'No'
              },
              {
                  'value': 'Not Applicable',
                  'label': 'Not Applicable'
              }
          ],
          'assets_list': [
              {
                  'value': 'Yes',
                  'label': 'Yes'
              },
              {
                  'value': 'No',
                  'label': 'No'
              },
              {
                  'value': 'Not Applicable',
                  'label': 'Not Applicable'
              }
          ],
          'floor_plan': [
              {
                  'value': 'Yes',
                  'label': 'Yes'
              },
              {
                  'value': 'No',
                  'label': 'No'
              },
              {
                  'value': 'Not Applicable',
                  'label': 'Not Applicable'
              }
          ],
          'has_financials': [
              {
                  'value': 'Yes',
                  'label': 'Yes'
              },
              {
                  'value': 'No',
                  'label': 'No'
              },
              {
                  'value': 'Owner will not Disclose',
                  'label': 'Owner will not Disclose'
              },
              {
                  'value': 'Not Applicable',
                  'label': 'Not Applicable'
              }
          ],
          'listing_terms_conditions': [
              {
                  'value': 'Seller agrees with the Terms and Conditions',
                  'label': 'Seller agrees with the Terms and Conditions'
              },
              {
                  'value': 'Listing Agreement signed',
                  'label': 'Listing Agreement signed'
              }
          ]
      };

      this.template['load'] = function(template){
        console.log(template);
        $(function(){
          $('#listing_relationship').on('change', function(){
            console.log($(this).val());
            if($(this).val() == 'Owner'){
              $('#email').fadeOut('fast');
            } 
          });
        });
      };

      this.template['afterPreviewRemoved'] = function(model, index, template){
          if(model == 'galley_images'){
            delete document.getElementById('galley_images').files[index];
            document.getElementById('galley_images').files.length = document.getElementById('galley_images').files.length - 1;
          }
      };

      this.template['afterNext'] = function(){
        $(function(){
          $('html, body').animate({
            'scrollTop': ($('[name="gen_ng_form"]').offset().top - 50) + 'px'
          });
        });
      };
      this.template['editMode'] = true;
      this.template['onValidationFailed'] = function(errors){
        $(function(){
          $('html, body').animate({
            'scrollTop': ($('[name="gen_ng_form"]').offset().top - 50) + 'px'
          });
          var errorList = '';
          for(var i = 0; i < errors.length; i++){
            errorList += '<div>' + errors[i] + '</div>';
          }

          $('.error-container').html(errorList)
                                .stop()
                                .fadeIn('fast')
                                .delay(3000)
                                .fadeOut('fast');
        });
      };
      this.template['onSubmit'] = processForm;
    }

    function processForm(event, template){
      console.log(this.templateModel);
      template['currentTabIndex'] = 1;
      $('html, body').animate({
        'scrollTop': ($('[name="gen_ng_form"]').offset().top - 50) + 'px'
      });
      this.templateModel = []
    }

    TestController.prototype.processForm = function(event, template) {
      console.log("Submit");

    };

    TestController.prototype.handleClick = function() {
      alert('clicked');
      return true;
    };

    TestController.prototype.handleChange = function() {
      alert('changed');
      return true;
    };

    return TestController;

  })();
  angular.module('app').controller('testController', [TestController]);
  return true;
})(window, document, window.jQuery, window.angular);
