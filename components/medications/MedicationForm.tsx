import { DURATIONS } from "@/constants/durations";
import { FREQUENCIES } from "@/constants/frequencies";
import { useAddMedication } from "@/hooks/medications/useAddMedication";
import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import DateTimePicker from "@react-native-community/datetimepicker";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { z } from "zod";

export default function MedicationForm() {
  const { mutate: addMedication } = useAddMedication({
    successRedirectPath: "/home",
  });

  const [selectedFrequency, setSelectedFrequency] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");

  const medicationSchema = z.object({
    name: z.string().min(1, { message: "Medication name is required." }),
    dosage: z.string().min(1, { message: "Dosage is required." }),
    frequency: z.string().min(1, { message: "Frequency is required." }),
    duration: z.string().min(1, { message: "Duration is required." }),
    startDate: z.date().min(1, { message: "Start date is required." }),
    times: z
      .array(z.string())
      .min(1, { message: "At least one time is required." }),
    notes: z.string().optional(),
    reminderEnabled: z.boolean(),
    refillReminder: z.boolean(),
    // currentSupply: z
    //   .number()
    //   .min(1, { message: "Current supply is required." }),
    // refillAt: z.number().min(1, { message: "Refill at is required." }),
    currentSupply: z.string().optional(),
    refillAt: z.string().optional(),
  });

  type UserFormType = z.infer<typeof medicationSchema>;

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    getValues,
    setValue,
    watch,
  } = useForm<UserFormType>({
    resolver: zodResolver(medicationSchema),
    defaultValues: {
      // name: "",
      // dosage: "",
      // frequency: "4",
      // duration: "",
      // currentSupply: 0,
      startDate: new Date(),
      times: ["9:00"],
      reminderEnabled: true,
      refillReminder: true,
      // refillAt: 0,
    },
  });

  const watchFrequency = watch("frequency");
  const watchedRefillReminder = watch("refillReminder");

  const updateTimes = (freq: string) => {
    const selectedFreq = FREQUENCIES.find((f) => f.label === freq);
    setValue("times", []);
    setValue("times", selectedFreq?.times || []);
  };

  const handleSave = async () => {
    console.log("Saving medication...");
    const colors = ["#4CAF50", "#2196F3", "#FF9800", "#E91E63", "#9C27B0"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const medicationData = {
      id: Math.random().toString(36).substr(2, 9),
      ...getValues(),

      currentSupply: getValues("currentSupply")
        ? Number(getValues("currentSupply"))
        : 0,
      //   totalSupply: form.currentSupply ? Number(form.currentSupply) : 0,
      refillAt: getValues("refillAt") ? Number(getValues("refillAt")) : 0,
      // startDate: getValues("startDate").toString(),
      color: randomColor,
    };

    // console.log("handleSave() medicationData", medicationData);
    addMedication(medicationData);
  };

  const onSubmit: SubmitHandler<UserFormType> = (data: UserFormType) => {
    handleSave();
  };

  function Footer() {
    return (
      <View style={styles.footer}>
        {/* {isValid ? <Text>Valid</Text> : <Text>Invalid</Text>} */}
        {errors.name && (
          <Text style={styles.errorText}>
            * Please provide a medication name.
          </Text>
        )}
        {errors.dosage && (
          <Text style={styles.errorText}>* Please provide a dosage.</Text>
        )}
        {errors.frequency && (
          <Text style={styles.errorText}>* Please select a frequency.</Text>
        )}
        {errors.duration && (
          <Text style={styles.errorText}>* Please select a duration.</Text>
        )}
        {/* {errors.currentSupply && (
          <Text style={styles.errorText}>* Please provide current supply.</Text>
        )}
        {errors.refillAt && (
          <Text style={styles.errorText}>* Please provide refill at.</Text>
        )} */}
        <TouchableOpacity
          style={[
            styles.saveButton,
            (isSubmitting || !isValid) && styles.saveButtonDisabled,
          ]}
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        >
          <LinearGradient
            colors={["#ffbf00", "#ffdf00"]}
            style={styles.saveButtonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.saveButtonText}>
              {isSubmitting ? "Adding..." : "Add Medication"}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => router.back()}
          disabled={isSubmitting}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function BasicInformation() {
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Which med?</Text>
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            name="name"
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {errors.name && (
                  <Ionicons
                    name={"medical"}
                    size={24}
                    color={"red"}
                    marginLeft={10}
                  />
                )}
                <TextInput
                  placeholder="Medication Name"
                  placeholderTextColor="#999"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  style={styles.mainInput}
                />
              </View>
            )}
          />
        </View>
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            name="dosage"
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {errors.dosage && (
                  <Ionicons
                    name={"medical"}
                    size={24}
                    color={"red"}
                    marginLeft={10}
                  />
                )}
                <TextInput
                  style={styles.mainInput}
                  placeholder="Dosage (e.g., 500mg)"
                  placeholderTextColor="#999"
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                />
              </View>
            )}
          />
        </View>
      </View>
    );
  }

  function Frequency() {
    return (
      <View style={styles.section}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {errors.frequency && (
            <Ionicons
              name={"medical"}
              size={24}
              color={"red"}
              marginLeft={11}
              marginRight={10}
            />
          )}
          <Text style={styles.sectionTitle}>How often?</Text>
        </View>
        <Controller
          control={control}
          name="frequency"
          render={({ field: { onChange } }) => (
            <View style={styles.optionsGrid}>
              {FREQUENCIES.map((freq) => (
                <TouchableOpacity
                  key={freq.id}
                  style={[
                    styles.optionCard,
                    selectedFrequency === freq.label &&
                      styles.selectedOptionCard,
                  ]}
                  onPress={() => {
                    setSelectedFrequency(freq.label);
                    updateTimes(freq.label);
                    onChange(freq.label);
                  }}
                >
                  <View
                    style={[
                      styles.optionIcon,
                      selectedFrequency === freq.label &&
                        styles.selectedOptionIcon,
                    ]}
                  >
                    <Ionicons
                      name={freq.icon}
                      size={24}
                      color={
                        selectedFrequency === freq.label ? "white" : "#666"
                      }
                    />
                  </View>
                  <Text
                    style={[
                      styles.optionLabel,
                      selectedFrequency === freq.label &&
                        styles.selectedOptionLabel,
                    ]}
                  >
                    {freq.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        />
      </View>
    );
  }

  function Duration() {
    return (
      <View style={styles.section}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {errors.duration && (
            <Ionicons
              name={"medical"}
              size={24}
              color={"red"}
              marginLeft={11}
              marginRight={10}
            />
          )}
          <Text style={styles.sectionTitle}>For how long?</Text>
        </View>
        <Controller
          control={control}
          name="duration"
          render={({ field: { onChange, value } }) => (
            <View style={styles.optionsGrid}>
              {DURATIONS.map((dur) => (
                <TouchableOpacity
                  key={dur.id}
                  style={[
                    styles.optionCard,
                    selectedDuration === dur.label && styles.selectedOptionCard,
                  ]}
                  onPress={() => {
                    setSelectedDuration(dur.label);
                    onChange(dur.label);
                  }}
                >
                  <Text
                    style={[
                      styles.durationNumber,
                      selectedDuration === dur.label &&
                        styles.selectedDurationNumber,
                    ]}
                  >
                    {dur.value && dur.value > -1 ? dur.value : "∞"}
                  </Text>
                  <Text
                    style={[
                      styles.optionLabel,
                      selectedDuration === dur.label &&
                        styles.selectedOptionLabel,
                    ]}
                  >
                    {dur.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        />
      </View>
    );
  }

  function DatePicker() {
    return (
      <View style={styles.section}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.sectionTitle}>Starts when?</Text>
        </View>
        <TouchableOpacity
          disabled={true}
          style={styles.dateButton}
          onPress={() => {
            // console.log("pressed");
          }}
        >
          <View style={styles.dateIconContainer}>
            <Ionicons name="calendar" size={20} color="#ffbf00" />
          </View>
          <DateTimePicker
            style={{
              backgroundColor: "#fff",
            }}
            value={getValues("startDate")}
            mode="date"
            onChange={(event, date) => {
              if (event.type === "set" && date) setValue("startDate", date);
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }

  function TimePicker() {
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>What times daily?</Text>
        <Text>{getValues("times").join(", ")}</Text>
        <View style={styles.timesContainer}>
          {getValues("times").map((time: string, index: number) => (
            <TouchableOpacity
              key={index}
              style={styles.timeButton}
              onPress={() => {}}
            >
              <View style={styles.timeIconContainer}>
                <Ionicons name="time-outline" size={20} color="#1a8e2d" />
              </View>
              <DateTimePicker
                value={(() => {
                  const [hours, minutes] = time.split(":").map(Number);
                  // console.log("getValues( times)", getValues("times"));

                  const date = new Date();
                  date.setHours(hours, minutes, 0, 0);
                  return date;
                })()}
                mode="time"
                onChange={(event, date) => {
                  if (event.type === "dismissed") return;
                  if (date) {
                    const newTime = date.toLocaleTimeString("default", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    });

                    const timeToUpdateIndex = getValues("times").findIndex(
                      (t) => t === time,
                    );

                    const newTimes = getValues("times").with(
                      timeToUpdateIndex,
                      newTime,
                    );

                    // console.log("newTimes", newTimes);
                    setValue("times", newTimes);
                    // console.log("getValues( times)", getValues("times"));
                  }
                }}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  }

  function Reminders() {
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Remind me?</Text>
        <View style={styles.card}>
          <View style={styles.switchRow}>
            <View style={styles.switchLabelContainer}>
              <View style={styles.iconContainer}>
                <Ionicons name="notifications" size={20} color="#ffbf00" />
              </View>
              <View>
                <Text style={styles.switchLabel}>Reminders</Text>
                <Text style={styles.switchSubLabel}>
                  Get notified when it&apos;s time to take your medication
                </Text>
              </View>
            </View>
            <Controller
              control={control}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <Switch
                  value={value}
                  onValueChange={(value) => setValue("reminderEnabled", value)}
                  trackColor={{ false: "#ddd", true: "#ffbf00" }}
                  thumbColor="white"
                />
              )}
              name="reminderEnabled"
            />
          </View>
        </View>
      </View>
    );
  }

  function Notes() {
    return (
      <View style={styles.section}>
        <View style={styles.textAreaContainer}>
          <Controller
            control={control}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <TextInput
                placeholder="Add notes or special instructions..."
                placeholderTextColor="#999"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={styles.textArea}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            )}
            name="notes"
          />
        </View>
      </View>
    );
  }

  function Refills() {
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Refills?</Text>
        <View style={styles.card}>
          <View style={styles.switchRow}>
            <View style={styles.switchLabelContainer}>
              <View style={styles.iconContainer}>
                <Ionicons name="reload" size={20} color="#ffbf00" />
              </View>
              <View>
                <Text style={styles.switchLabel}>Refill Tracking</Text>
                <Text style={styles.switchSubLabel}>
                  Get notified when you need to refill
                </Text>
              </View>
            </View>
            <Controller
              name="refillReminder"
              control={control}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <Switch
                  value={value}
                  onValueChange={(value) => {
                    setValue("refillReminder", value);
                  }}
                  trackColor={{ false: "#ddd", true: "#ffbf00" }}
                  thumbColor="white"
                />
              )}
            />
          </View>
          {watchedRefillReminder && (
            <View style={styles.refillInputs}>
              <View>
                <View style={[styles.inputContainer, styles.flex1]}>
                  <Controller
                    name="currentSupply"
                    control={control}
                    render={({
                      field: { onChange, onBlur, value },
                      fieldState: { error },
                    }) => (
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        {errors.currentSupply && (
                          <Ionicons
                            name={"medical"}
                            size={24}
                            color={"red"}
                            marginLeft={11}
                            marginRight={10}
                          />
                        )}
                        <TextInput
                          style={styles.input}
                          placeholder="Current Supply"
                          placeholderTextColor="#999"
                          onBlur={onBlur}
                          onChangeText={onChange}
                          value={value}
                          keyboardType="numeric"
                        />
                      </View>
                    )}
                  />
                </View>
                <View style={[styles.inputContainer, styles.flex1]}>
                  <Controller
                    name="refillAt"
                    control={control}
                    render={({
                      field: { onChange, onBlur, value },
                      fieldState: { error },
                    }) => (
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        {errors.refillAt && (
                          <Ionicons
                            name={"medical"}
                            size={24}
                            color={"red"}
                            marginLeft={11}
                            marginRight={10}
                          />
                        )}
                        <TextInput
                          style={styles.input}
                          placeholder="Alert At"
                          placeholderTextColor="#999"
                          onBlur={onBlur}
                          onChangeText={onChange}
                          value={value}
                          keyboardType="numeric"
                        />
                      </View>
                    )}
                  />
                </View>
              </View>
            </View>
          )}
        </View>
      </View>
    );
  }

  return (
    <View style={styles.content}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.formContentContainer}
      >
        <BasicInformation />
        <View style={styles.section}>
          <Frequency />
          <Duration />
          <DatePicker />
          {watchFrequency && watchFrequency !== "As needed" && <TimePicker />}
          <Reminders />
          <Refills />
          <Notes />
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
}

export const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
  },
  formContentContainer: {
    padding: 20,
    paddingTop: 0,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "white",
    marginBottom: 15,
    marginTop: 0,
  },
  durationNumber: {
    fontSize: 24,
    fontWeight: "700",
    color: "#ffbf00",
    marginBottom: 5,
  },
  selectedDurationNumber: {
    color: "white",
  },
  inputRow: {
    flexDirection: "row",
    marginTop: 15,
    gap: 10,
  },
  flex1: {
    flex: 1,
  },
  input: {
    padding: 15,
    fontSize: 16,
    color: "#333",
  },
  inputContainer: {
    backgroundColor: "white",
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  dateButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 16,
    padding: 15,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  dateButtonText: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  dateIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  inputError: {
    backgroundColor: "rgba(217, 50, 50, 0.1)",
  },
  mainInput: {
    fontSize: 20,
    color: "#333",
    padding: 15,
  },
  footer: {
    padding: 20,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  saveButton: {
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 12,
  },
  saveButtonDisabled: {
    opacity: 0.5,
  },
  saveButtonGradient: {
    paddingVertical: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
  cancelButton: {
    paddingVertical: 15,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "700",
  },
  errorText: {
    color: "#FF5252",
    fontSize: 12,
    marginTop: 4,
    marginBottom: 12,
    marginLeft: 12,
  },
  optionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -5,
  },
  optionCard: {
    width: (Dimensions.get("window").width - 60) / 2,
    backgroundColor: "white",
    borderRadius: 16,
    padding: 15,
    margin: 5,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  selectedOptionCard: {
    backgroundColor: "#ffbf00", // "#1a8e2d",
    borderColor: "#ffbf00", // "#1a8e2d",
  },
  optionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  selectedOptionIcon: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  optionLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },
  selectedOptionLabel: {
    color: "white",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  switchLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  switchLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  switchSubLabel: {
    fontSize: 13,
    color: "#666",
    marginTop: 2,
    marginRight: 50,
  },
  timesContainer: {
    marginTop: 20,
  },
  timesTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
  },
  timeButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 16,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  timeIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  timeButtonText: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  refillInputs: {
    marginTop: 15,
  },
  textAreaContainer: {
    backgroundColor: "white",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  textArea: {
    height: 100,
    padding: 15,
    fontSize: 16,
    color: "#333",
  },
});
