import React from "react";
import { Item, Input, Icon, View } from "native-base";

const SearchBar = ({ searchText, newSearchText, onTermSubmit }) => {
  return (
    <View style={{ paddingBottom: 15 }}>
      <Item>
        <Icon name="ios-search" />
        <Input
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Search"
          value={searchText}
          onChangeText={newSearchText}
          onKeyPress={onTermSubmit}
        />
        <Icon name="ios-people" />
      </Item>
    </View>
  );
};

export default SearchBar;
