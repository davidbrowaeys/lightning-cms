var postCode = "";
var selectedSuburb = "";

var iSelectAddresses = new Bloodhound({
  datumTokenizer: function(addresses) {
      return Bloodhound.tokenizers.whitespace(addresses.id);
  },
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  remote: {
    url: '/apex/getAddress',
    ajax: $.ajax({type:'GET',dataType:'jsonp',jsonp:'jsonp'}),
    prepare : function (query, settings) {
      queryTokenizer: Bloodhound.tokenizers.whitespace;
      settings.url = settings.url + '?postCode='+postCode+'&address=' + query + '&suburb=' + selectedSuburb + '&callBack=?';
      console.log('query');
      console.log(query);
      return settings;
    },
    filter: function(response) {
      console.log('response');
      console.log(response);
      console.log('response.response');
      console.log(response.response);
      console.log('response.response.docs');
      console.log(response.response.docs);
      return response.response.docs;
    }

  }
});

var iSelectPostcodes = new Bloodhound({
  datumTokenizer: function(addresses) {
      return Bloodhound.tokenizers.whitespace(addresses.id);
  },
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  remote: {
    url: '/apex/getAddress',
    ajax: $.ajax({type:'GET',dataType:'jsonp',jsonp:'jsonp'}),
    prepare : function (query, settings) {
      queryTokenizer: Bloodhound.tokenizers.whitespace;
      settings.url = settings.url + '?postcode=' + query + '&callBack=?';
      console.log('query');
      console.log(query);
      return settings;
    },
    filter: function(response) {
      console.log('response');
      console.log(response);
      console.log('response.response');
      console.log(response.response);
      console.log('response.response.docs');
      console.log(response.response.docs);
      return response.response.docs;
    }

  }
});
