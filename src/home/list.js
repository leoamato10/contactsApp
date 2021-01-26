import React, { useState, memo } from "react";
import * as Linking from "expo-linking";
import { Body, Right, Text, ListItem, Thumbnail, Icon } from "native-base";
import { TouchableOpacity, Modal, View, Image, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;

const noPhoto =
  "https://bauerglobalbrigades.files.wordpress.com/2018/10/no-photo7.png";

const imgExist = (item) => {
  if (item.imageAvailable) {
    return { uri: item.image.uri };
  } else {
    return { uri: noPhoto };
  }
};

const List = memo(({ item, navigation, deleteHandler }) => {
  const [modalOpen, setModalOpen] = useState(false);
  console.log("rendered");
  return (
    <ListItem thumbnail>
      <Modal
        animationType="fade"
        transparent
        visible={modalOpen}
        onRequestClose={() => {
          setModalOpen(false);
        }}
      >
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => {
            setModalOpen(false);
          }}
        >
          <TouchableOpacity
            style={{
              position: "relative",
              top: windowWidth / 2,
              width: windowWidth / 1.6,
              height: windowWidth / 1.4,
              justifyContent: "center",
              alignSelf: "center",
            }}
            onPress={() => {}}
          >
            <View>
              <View
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  backgroundColor: "rgba(0, 0, 0, 0.2)",
                  zIndex: 1,
                  width: "100%",
                  height: 30,
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    paddingHorizontal: 10,
                  }}
                  numberOfLines={1}
                >
                  {item.name}
                </Text>
              </View>

              <Image
                source={imgExist(item)}
                style={{ width: "100%", height: "100%" }}
              />
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
      <TouchableOpacity onPress={() => setModalOpen(true)}>
        <Thumbnail source={imgExist(item)} />
      </TouchableOpacity>
      <Body>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("ContactCard", { item, deleteHandler })
          }
        >
          <Text numberOfLines={1} style={{ paddingRight: 20 }}>
            {item.name}
          </Text>
          <Text note>
            {item.phoneNumbers ? item.phoneNumbers[0].number : null}
          </Text>
        </TouchableOpacity>
      </Body>
      <Right>
        {item.phoneNumbers && (
          <Icon
            type="FontAwesome"
            name="phone"
            style={{ fontSize: 25 }}
            onPress={() => {
              Linking.openURL(`tel://${item.phoneNumbers[0].number}`);
            }}
          />
        )}
      </Right>
      <Right>
        {item.phoneNumbers && (
          <Icon
            type="FontAwesome"
            name="whatsapp"
            style={{ fontSize: 25 }}
            onPress={() => {
              Linking.openURL("https://wa.me/" + item.phoneNumbers[0].number);
            }}
          />
        )}
      </Right>
    </ListItem>
  );
});

export default List;
