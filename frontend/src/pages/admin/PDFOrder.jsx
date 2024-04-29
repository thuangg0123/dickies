import React from "react";
import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import moment from "moment";
import logo from "../../img/logo.png";

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  section: {
    fontSize: 11,
    marginBottom: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
  },
  subheading: {
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 10,
  },
  text: {
    fontSize: 13,
    marginBottom: 5,
  },
  total: {
    textAlign: "right",
    fontWeight: "bold",
    marginTop: 10,
  },
  logo: {
    width: 100,
    height: 50,
  },
  containerLogo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

const PDFOrder = ({ dataDetailOrder }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.containerLogo}>
        <Image source={logo} style={styles.logo} />\
      </View>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Detail order</Text>
          <Text style={styles.text} fixed>
            Date: {moment().format("DD/MM/YYYY")}
          </Text>
        </View>
        <View style={styles.header}>
          <Text style={styles.text} fixed>
            Status: {dataDetailOrder?.status}
          </Text>
          <Text style={styles.text} fixed>
            Id: {dataDetailOrder?._id}
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.subheading}>Information Customer</Text>
          <Text style={styles.text}>
            Name:
            {`${dataDetailOrder?.orderBy?.firstName} ${dataDetailOrder?.orderBy?.lastName}`}
          </Text>
          <Text style={styles.text}>
            Address: {dataDetailOrder?.orderBy?.address}
          </Text>
          <Text style={styles.text}>
            Email: {dataDetailOrder?.orderBy?.email}
          </Text>
          <Text style={styles.text}>
            Phone: {dataDetailOrder?.orderBy?.phone}
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.subheading}>Payment Methods</Text>
          <Text style={styles.text}>Paypal</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.subheading}>Order created date</Text>
          <Text style={styles.text}>
            {moment(dataDetailOrder?.createdAt).format("DD/MM/YYYY")}
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.subheading}>Information Product</Text>
          <View style={styles.table}>
            {dataDetailOrder?.products?.map((product, index) => (
              <React.Fragment key={product._id}>
                <View style={styles.tableRow}>
                  <Text style={[styles.tableCell, { marginBottom: 5 }]}>
                    Name Product: {product?.product?.title}
                  </Text>
                  <Text style={[styles.tableCell, { marginBottom: 5 }]}>
                    Color: {product?.color}
                  </Text>
                  <Text style={[styles.tableCell, { marginBottom: 5 }]}>
                    Size: {product?.size}
                  </Text>
                  <Text style={[styles.tableCell, { marginBottom: 5 }]}>
                    Price: ${parseFloat(product?.price).toFixed(2)}
                  </Text>
                  <Text style={[styles.tableCell, { marginBottom: 5 }]}>
                    Quantity: {product?.quantity}
                  </Text>
                  <Text style={[styles.tableCell, { marginBottom: 5 }]}>
                    Total Price: $
                    {parseFloat(product?.price * product?.quantity).toFixed(2)}
                  </Text>
                </View>
                {index !== dataDetailOrder.products.length - 1 && (
                  <View style={{ marginBottom: 10 }} />
                )}
              </React.Fragment>
            ))}
            <View style={[styles.tableRow, { marginTop: 20 }]}>
              <Text style={styles.tableCell} colSpan={5}>
                Total Price Order: $
                {parseFloat(dataDetailOrder.total).toFixed(2)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

export default PDFOrder;
