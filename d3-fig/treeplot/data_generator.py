import json

filename = "data2.json"

released = {
		"iphone" : 2007,
		"iphone 3G" : 2008,
		"iphone 3GS" : 2009,
		"iphone 4" : 2010,
		"iphone 4S" : 2011,
		"iphone 5" : 2012
	}


def create_dict(dict_data, iteration_counter, amount_children, name_string):
	dict_data["name"]="node"+name_string
	if(iteration_counter>0):
		list_children_dict = []
		for i in range(0,amount_children):
			tmp_dict = {}
			tmp_name_string = name_string+"."+str(i)
			create_dict(tmp_dict,iteration_counter-1,amount_children,tmp_name_string)
			list_children_dict.append(tmp_dict)		
		dict_data["children"]=list_children_dict


#Allows to be used standalone.
if __name__ == "__main__":

	dict_data = {}
	create_dict(dict_data,3,10, "1")

	with open(filename, 'w') as file:  # Use file to refer to the file object
		file.write(json.dumps(dict_data))
