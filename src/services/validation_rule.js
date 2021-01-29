// Require Internal Dependencies
const helpers = require('../utils/helpers');

/**
 * Uses the `helper` parameter to handle the returned function
 * @param {object} helper - Imported helper object
 * @returns {Function} A function that takes the request payload,
 * checks for errors, and check the nested data object against a
 * given condition in the rule object.
 */
const rule_validate = (helper) => (dataObject) => {
  if (!helper.is_payload_json(dataObject)) {
    return {
      message: 'Invalid JSON payload passed.',
      status: 'error',
      data: null,
    };
  }

  const check_dataObject_fields = helper.has_required_fields(dataObject, [
    'rule',
    'data',
  ]);
  if (check_dataObject_fields != true) {
    return {
      message: check,
      status: 'error',
      data: null,
    };
  }

  // destructure the dataObject since rule and data exists
  const { rule, data } = dataObject;

  if (!helper.has_valid_rule_field(rule)) {
    return {
      message: 'rule should be an object.',
      status: 'error',
      data: null,
    };
  }

  if (!helper.has_valid_data_field(data)) {
    return {
      message: 'data should be an object or an array or a string.',
      status: 'error',
      data: null,
    };
  }

  const check_rule_fields = helper.has_required_fields(rule, [
    'condition_value',
    'condition',
    'field',
  ]);

  if (check_rule_fields != true) {
    return {
      message: check_rule_fields,
      status: 'error',
      data: null,
    };
  }

  const field_value = helper.get_rule_field_in_data_object(data, rule.field);
  if (field_value == null) {
    return {
      message: `field ${rule.field} is missing from data.`,
      status: 'error',
      data: null,
    };
  }

  // at this point, we can define our response object with data field(validation_object)
  const validation_result = {
    error: false,
    field: rule.field,
    field_value,
    condition: rule.condition,
    condition_value: rule.condition_value,
  };

  if (helper.conditions(field_value, rule.condition, rule.condition_value)) {
    validation_result.error = false;
    return {
      message: `field ${dataObject.rule.field} successfully validated.`,
      status: 'success',
      data: validation_result,
    };
  }
  validation_result.error = true;
  return {
    message: `field ${dataObject.rule.field} failed validation.`,
    status: 'error',
    data: validation_result,
  };
};

module.exports = rule_validate(helpers);
